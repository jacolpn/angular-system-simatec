import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoBreadcrumb } from '@po-ui/ng-components';
import { PoCheckboxGroupOption, PoMultiselectOption } from '@po-ui/ng-components';

import { PoDialogService } from '@po-ui/ng-components';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';
import { PoPageListComponent } from '@po-ui/ng-components';

import { PoPageListService } from '../page-list/po-page-list.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any; // PoModalComponent;
  @ViewChild('poPageList', { static: true }) poPageList: any; // PoPageListComponent;

  disclaimerGroup: any;
  hiringProcesses: Array<object> = [];
  planningColumns: Array<PoTableColumn> = [];
  planningFiltered: Array<object> = [];
  jobDescription: Array<string> = [];
  labelFilter: string = '';
  concluded: Array<string> = [];
  statusOptions: Array<PoCheckboxGroupOption> = [];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Concluir', action: this.concludePlanning.bind(this), disabled: this.disableHireButton.bind(this) },
    { label: 'Excluir', action: this.excludePlannig.bind(this), disabled: this.disableHireButton.bind(this) }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: 'Programação e planejamento SIMATEC' }
    ]
  };

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: () => {
      this.poPageList.clearInputSearch();
      this.advancedFilterModal.close();
      const filters = [...this.concluded];
      this.filterAction(filters);
    },

    label: 'Aplicar filtro'
  };

  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Search'
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
        
        selectedCandidate['concluded'] = 'Pendente';

        this.poNotification.warning('Programação pendente!');
        break;

      case 'Pendente':
        console.log("ID do registro: ", selectedCandidate['id'], ", ", selectedCandidate['concluded']);

        selectedCandidate['concluded'] = 'Concluido';

        this.poNotification.success('Programação concluída com sucesso!');
        break;
    }
  }
  
  excludePlannig() {
    const selectedCandidate: any = this.hiringProcesses.find((candidate: any) => candidate['$selected']);
    console.log("ID do registro: ", selectedCandidate['id']);
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

  private beforeRedirect(itemBreadcrumbLabel: any) {
    if (this.hiringProcesses.some((candidate: any) => candidate['$selected'])) {
      this.poDialog.confirm({
        title: `Confirm redirect to ${itemBreadcrumbLabel}`,
        message: `There is data selected. Are you sure you want to quit?`,
        confirm: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}