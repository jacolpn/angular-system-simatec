import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoCheckboxGroupOption } from '@po-ui/ng-components';

import { PoDialogService } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

import { PoPageListService } from '../page-list/po-page-list.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any;
  @ViewChild('newPlanning', { static: true }) newPlanning: any;
  @ViewChild('poPageList', { static: true }) poPageList: any;

  disclaimerGroup: any;
  hiringProcesses: Array<object> = [];
  planningColumns: Array<PoTableColumn> = [];
  planningFiltered: Array<object> = [];
  jobDescription: Array<string> = [];
  labelFilter: string = '';
  concluded: Array<string> = [];
  statusOptions: Array<PoCheckboxGroupOption> = [];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Alterar conclusão', action: this.concludePlanning.bind(this), disabled: this.disableHireButton.bind(this) },
    { label: 'Novo', action: this.insertPlanning.bind(this) },
    { label: 'Excluir', action: this.excludePlannig.bind(this), disabled: this.disableHireButton.bind(this) }
  ];

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: () => {
      this.poPageList.clearInputSearch();
      this.advancedFilterModal.close();
      const filters = [...this.concluded];
      this.filterAction(filters);
    },

    label: 'Aplicar filtro'
  };

  public readonly newPlanningPrimaryAction: PoModalAction = {
    action: () => {
      console.log('NewPlanningPrimaryAction()!')
      
      this.poNotification.success('Programação salva com sucesso!')
      this.closeModal();
    },

    label: 'Salvar'
  };

  public readonly closePlanningSecondaryAction: PoModalAction = {
    action: () => {
      this.closeModal();
    },

    label: 'Fechar'
  };

  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Pesquisar'
  };

  private disclaimers: any = [];

  constructor(
    private sampleHiringProcessesService: PoPageListService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.disclaimerGroup = {
      title: 'Filtros',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this),
      remove: this.onClearDisclaimer.bind(this)
    };

    this.hiringProcesses = this.sampleHiringProcessesService.getItems();
    this.planningColumns = this.sampleHiringProcessesService.getColumns();
    this.statusOptions = this.sampleHiringProcessesService.getHireStatus();
    this.planningFiltered = [...this.hiringProcesses];
  }

  closeModal() {
    // this.form.reset();
    this.newPlanning.close();
  }

  insertPlanning() {
    console.log('InsertPlanning()!');
    // this.router.navigate(['/teste'])
    
    this.newPlanning.open();
  }

  advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }

  disableHireButton() {
    return !this.hiringProcesses.find((candidate: any) => candidate['$selected']);
  }

  filter() {
    const filters = this.disclaimers.map((disclaimer: any) => disclaimer.value);
    filters.length ? this.hiringProcessesFilter(filters) : this.resetFilterHiringProcess();
  }

  filterAction(labelFilter: string | Array<string>) {
    const filter = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];
    this.populateDisclaimers(filter);
    this.filter();
  }

  concludePlanning() {
    const selectedCandidate: any = this.hiringProcesses.find((candidate: any) => candidate['$selected']);
    switch (selectedCandidate['concluded']) {
      case 'Concluido':
        console.log("ID do registro: ", selectedCandidate['id'], ", ", selectedCandidate['concluded']);
        
        selectedCandidate['concluded'] = 'Em andamento';

        this.poNotification.warning('Programação em andamento!');
        break;

      case 'Em andamento':
        console.log("ID do registro: ", selectedCandidate['id'], ", ", selectedCandidate['concluded']);

        selectedCandidate['concluded'] = 'Concluido';

        this.poNotification.success('Programação concluída com sucesso!');
        break;
    }
  }
  
  excludePlannig() {
    const selectedCandidate: any = this.hiringProcesses.find((candidate: any) => candidate['$selected']);
    console.log("ID do registro: ", selectedCandidate['id']);
    console.log(this.concludePlanning.bind(this))
  }

  hiringProcessesFilter(filters: any) {
    this.planningFiltered = this.hiringProcesses.filter((item: any) =>
      Object.keys(item).some(key => !(item[key] instanceof Object) && this.includeFilter(item[key], filters))
    );
  }

  includeFilter(item: any, filters: any) {
    return filters.some((filter: any) => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  onChangeDisclaimer(disclaimers: any) {
    this.disclaimers = disclaimers;
    this.filter();
  }

  onClearDisclaimer(disclaimers: any) {
    if (disclaimers.removedDisclaimer.property === 'search') {
      this.poPageList.clearInputSearch();
    }
    this.disclaimers = [];
    this.filter();
  }

  populateDisclaimers(filters: Array<any>) {
    const property = filters.length > 1 ? 'advanced' : 'search';
    this.disclaimers = filters.map(value => ({ value, property }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  resetFilterHiringProcess() {
    this.planningFiltered = [...this.hiringProcesses];
    this.concluded = [];
    this.jobDescription = [];
  }
}
