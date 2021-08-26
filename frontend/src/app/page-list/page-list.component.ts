import { Component, OnInit, ViewChild } from '@angular/core';

import { PoCheckboxGroupOption, PoDynamicFormField } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

import { PoPageListService } from '../page-list/po-page-list.service';
import { Planning } from './planning.model';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any;
  @ViewChild('newPlanning', { static: true }) newPlanning: any;
  @ViewChild('poPageList', { static: true }) poPageList: any;
  @ViewChild('dynamicForm', { static: true }) dynamicForm: any;

  disclaimerGroup: any;
  hiringProcesses: Array<object> = [];
  planningColumns: Array<PoTableColumn> = [];
  labelFilter: string = '';
  concluded: Array<string> = [];
  statusOptions: Array<PoCheckboxGroupOption> = [];
  planning: Array<object> = [];
  fields: Array<PoDynamicFormField> = [];

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

    label: 'Buscar'
  };

  public readonly newPlanningPrimaryAction: PoModalAction = {
    action: () => {
      if (this.dynamicForm.form.status == "INVALID") {
        this.poNotification.error('Favor preencher todos os campos!');
      } else {
        this.newPlanningPrimaryAction.loading = true;

        setTimeout(() => {
          this.savePlanning(this.dynamicForm.form.value);
          this.newPlanningPrimaryAction.loading = false;
          this.dynamicForm.form.reset();
          this.closeModal();
        }, 700);
      }
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

  constructor(private poNotification: PoNotificationService, private poPageListService: PoPageListService) { }

  ngOnInit() {
    this.disclaimerGroup = {
      title: 'Filtros',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this),
      remove: this.onClearDisclaimer.bind(this)
    };

    this.getPlanning();
    this.planningColumns = this.poPageListService.getColumns();
    this.fields = this.poPageListService.getFields();
    this.statusOptions = this.poPageListService.getHireStatus();
  }

  getPlanning() {
    this.poPageListService.getPlanningHTTP().subscribe({
      next: (value) => {
        this.planning = value.map((item: any) => new Planning(
          item.id,
          item.concluded,
          item.description,
          item.priority,
          item.responsible,
          item.runtime,
          item.startExecution,
          item.status = this.updateStartExecution(
            item.startExecution,
            item.runtime,
            item.concluded
          ),
          item.relationWork,
          item.vehicle,
          item.operationWeekend,
          item.scheduleTomorrow = this.updateScheduleTomorrow(
            item.startExecution,
            item.concluded,
            item.priority,
            item.operationWeekend
          )
        ))

        this.hiringProcesses = this.planning;
        this.planning = [...this.hiringProcesses];
        this.populateDisclaimers(['Em andamento']);
      },
      error: err => {
        this.planning = this.poPageListService.getItems();
        
        this.planning.map((item: any) => {
          item.status = this.updateStartExecution(
            item.startExecution,
            item.runtime,
            item.concluded
          ),
          item.scheduleTomorrow = this.updateScheduleTomorrow(
            item.startExecution,
            item.concluded,
            item.priority,
            item.operationWeekend
          );
        })

        this.hiringProcesses = this.planning;
        this.planning = [...this.hiringProcesses];
        this.populateDisclaimers(['Em andamento']);

        console.log(err);
      }
    });
  }

  updateStartExecution(startExecution: Date, runtime: string, concluded: string) {
    let dataStartExecution = new Date(startExecution);
    let dataHoje = new Date();
    let status;

    dataStartExecution.setDate(dataStartExecution.getDate() + parseInt(runtime));
    status = 'No prazo';

    if (dataStartExecution < dataHoje) {
      status = "No prazo";
    }

    if (dataStartExecution > dataHoje) {
      status = "Fora prazo";
    }

    if (concluded == "Concluido") {
      status = "Concluido";
    }

    return status;
  }

  updateScheduleTomorrow(startExecution: Date, concluded: string, priority: string, operationWeekend: string) {
    let dataStartExecution = new Date(startExecution);
    let dataHoje = new Date();
    let dataFindSemana;
    let scheduleTomorrow;

    dataFindSemana = dataHoje.getDay() == 0 || dataHoje.getDay() == 6 ? true : false;
    dataHoje.setDate(dataHoje.getDate() + 1);
    scheduleTomorrow = "Não";

    if (concluded != "Concluido") {
      if (parseInt(priority) < 2 && dataStartExecution <= dataHoje) {
        if (dataFindSemana == true && operationWeekend == "Sim") {
          scheduleTomorrow = "Sim"
        }

        if (dataFindSemana == false && operationWeekend == "Sim") {
          scheduleTomorrow = "Sim"
        }

        if (dataFindSemana == true && operationWeekend == "Não") {
          scheduleTomorrow = "Sim"
        }
      }
    }

    return scheduleTomorrow;
  }

  savePlanning(planning: Planning) {
    planning.concluded = 'Em andamento';
    planning.status = this.updateStartExecution(
      planning.startExecution,
      planning.runtime,
      planning.concluded
    );
    planning.scheduleTomorrow = this.updateScheduleTomorrow(
      planning.startExecution,
      planning.concluded,
      planning.priority,
      planning.operationWeekend
    );

    console.log(planning);
    console.log(planning.scheduleTomorrow);
    console.log(planning.status);

    this.poPageListService
        .postPlanning(planning)
        .subscribe({
          next: value => {
            this.poNotification.success('Programação salva com sucesso!');
            this.getPlanning();
          },
          error: err =>  {
            this.planning.push(planning);

            console.log(err);
          }
        });
  }

  excludePlannig() {
    const selectedCandidate: any = this.hiringProcesses.find((candidate: any) => candidate['$selected']);

    this.poPageListService
        .putPlanning(selectedCandidate['id'])
        .subscribe({
          next: value => {
            this.poNotification.success('Programação removida com sucesso!');
            this.getPlanning();
          },
          error: err =>  {
            var indice = this.planning.indexOf(selectedCandidate);

            this.planning.splice(indice, 1);

            console.log(err);
          }
        });
  }

  closeModal() {
    this.newPlanning.close();
  }

  insertPlanning() {
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

  hiringProcessesFilter(filters: any) {
    this.planning = this.hiringProcesses.filter((item: any) =>
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
    this.planning = [...this.hiringProcesses];
    this.concluded = [];
  }
}
