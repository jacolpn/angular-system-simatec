import { Component, OnInit, ViewChild } from '@angular/core';

import { PoCheckboxGroupOption, PoDynamicFormField } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

import { environment } from 'src/environments/environment';

import { PoPageListService } from '../page-list/po-page-list.service';
import { OfflineService } from './offline.service';
import { Planning } from './planning.model';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: any;
  @ViewChild('newPlanning', { static: true }) newPlanning: any;
  @ViewChild('poPageList', { static: true }) poPageList: any;
  @ViewChild('dynamicForm', { static: true }) dynamicForm: any;

  private disclaimers: Array<object> = [];

  disclaimerGroup: any;
  hiringProcesses: Array<object> = [];
  planningColumns: Array<PoTableColumn> = [];
  labelFilter: string = '';
  situation: Array<string> = [];
  statusOptions: Array<PoCheckboxGroupOption> = [];
  planning: Array<object> = [];
  fields: Array<PoDynamicFormField> = [];

  public readonly actions: Array<PoPageAction> = [
    {
      label: 'Alterar conclusão',
      action: this.updateSituation.bind(this),
      disabled: this.disableHireButton.bind(this),
    },
    { label: 'Novo', action: this.openModal.bind(this) },
    {
      label: 'Excluir',
      action: this.excludePlannig.bind(this),
      disabled: this.disableHireButton.bind(this),
    },
  ];

  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: () => {
      const filters = [...this.situation];

      this.poPageList.clearInputSearch();
      this.advancedFilterModal.close();
      this.filterAction(filters);
    },
    label: 'Buscar',
  };

  public readonly newPlanningPrimaryAction: PoModalAction = {
    action: () => {
      if (this.dynamicForm.form.status == 'INVALID') {
        this.poNotification.error('Favor preencher todos os campos!');
      } else {
        this.newPlanningPrimaryAction.loading = true;

        setTimeout(() => {
          this.savePlanning(this.dynamicForm.form.value);
          this.newPlanningPrimaryAction.loading = false;
          this.dynamicForm.form.reset();
          this.newPlanning.close();
        }, 700);
      }
    },
    label: 'Salvar',
  };

  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    advancedAction: this.advancedFilterActionModal.bind(this),
    placeholder: 'Pesquisar',
  };

  constructor(
    private poNotification: PoNotificationService,
    private poPageListService: PoPageListService,
    private poDialog: PoDialogService,
    private offlineService: OfflineService
  ) { }

  ngOnInit() {
    this.disclaimerGroup = {
      title: 'Filtros',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this),
      remove: this.onClearDisclaimer.bind(this),
    };

    this.getPlanning();
    this.planningColumns = this.poPageListService.getColumns();
    this.fields = this.poPageListService.getFields();
    this.statusOptions = this.poPageListService.getHireStatus();
  }

  getPlanning(): void {
    if (!environment.offline) {
      this.poPageListService.getPlanning().subscribe({
        next: (value) => {
          this.planning = value.map(
            (item: Planning) =>
              new Planning(
                item.id,
                item.situation,
                item.description,
                item.priority,
                item.responsible,
                item.runtime,
                item.startExecution,
                (item.status = this.poPageListService.updateStartExecution(
                  item.startExecution,
                  item.runtime,
                  item.situation
                )),
                item.relationWork,
                item.vehicle,
                item.operationWeekend,
                (item.scheduleTomorrow =
                  this.poPageListService.updateScheduleTomorrow(
                    item.startExecution,
                    item.situation,
                    item.priority,
                    item.operationWeekend
                  ))
              )
          );

          this.hiringProcesses = this.planning;
          this.planning = [...this.hiringProcesses];
          this.populateDisclaimers(['Em andamento']);
        },
        error: () => this.poNotification.error('Banco de dados offline!'),
      });
    } else {
      this.planning = this.offlineService.getPlanningOffline();
      this.hiringProcesses = this.planning;
      this.planning = [...this.hiringProcesses];
      this.populateDisclaimers(['Em andamento']);
    }
  }

  savePlanning(planning: Planning): void {
    planning.situation = 'Em andamento';
    planning.status = this.poPageListService.updateStartExecution(
      planning.startExecution,
      planning.runtime,
      planning.situation
    );
    planning.scheduleTomorrow = this.poPageListService.updateScheduleTomorrow(
      planning.startExecution,
      planning.situation,
      planning.priority,
      planning.operationWeekend
    );

    if (!environment.offline) {
      this.poPageListService.postPlanning(planning).subscribe({
        next: () => {
          this.poNotification.success('Programação salva com sucesso!');
          this.getPlanning();
        },
        error: () => this.poNotification.error('Verifique as informações preenchidas!'),
      });
    } else {
      this.offlineService.postPlanningOffline(this.planning, planning);
    }
  }

  excludePlannig(): void {
    const selectedPlanning: any = this.hiringProcesses.find((planning: any) => planning['$selected']);

    this.poDialog.confirm({
      title: 'Exclusão',
      message: `Deseja realmente excluir o registro <b>${selectedPlanning['description']}</b>?`,
      confirm: () => {
        if (!environment.offline) {
          this.poPageListService
            .deletePlanning(selectedPlanning['id'])
            .subscribe({
              next: () => {
                this.poNotification.success('Programação removida com sucesso!');
                this.getPlanning();
              },
              error: () => this.poNotification.error('Verifique o registro selecionado!'),
            });
        } else {
          this.offlineService.deletePlanningOffline(this.planning, selectedPlanning)
        }
      },
    }); 
  }

  updateSituation(): void {
    const selectedPlanning: any = this.hiringProcesses.find((planning: any) => planning['$selected']);

    this.poDialog.confirm({
      title: `Alteração`,
      message: `Deseja realmente alterar a conclusão do registro <b>${selectedPlanning['description']}</b>?`,
      confirm: () => {
        if (!environment.offline) {
          this.poPageListService
            .updateSituation({
              id: selectedPlanning['id'],
              situation: selectedPlanning['situation'],
            })
            .subscribe({
              next: () => {
                this.poNotification.success('Programação alterada com sucesso!');
                this.getPlanning();
              },
              error: () => this.poNotification.warning('Não foi possível alterar a situação')
            });
        } else {
          this.offlineService.setSituation(selectedPlanning);
        }
      },
    });
  }

  openModal(): PoModalAction {
    return this.newPlanning.open();
  }

  advancedFilterActionModal(): void {
    this.advancedFilterModal.open();
  }

  disableHireButton(): Boolean {
    return !this.hiringProcesses.find((planning: any) => planning['$selected']);
  }

  filter(): void {
    const filters = this.disclaimers.map((disclaimer: any) => disclaimer.value);

    return filters.length ? this.hiringProcessesFilter(filters) : this.resetFilterHiringProcess();
  }

  filterAction(labelFilter: string | Array<string>): void {
    const filter = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];

    this.populateDisclaimers(filter);
    this.filter();
  }

  hiringProcessesFilter(filters: any): void {
    this.planning = this.hiringProcesses.filter((item: any) =>
      Object.keys(item).some(
        (key) => !(item[key] instanceof Object) && this.includeFilter(item[key], filters)
      )
    );
  }

  includeFilter(item: any, filters: any): void {
    return filters.some((filter: any) =>
      String(item)
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    );
  }

  onChangeDisclaimer(disclaimers: any): void {
    this.disclaimers = disclaimers;
    this.filter();
  }

  onClearDisclaimer(disclaimers: any): void {
    if (disclaimers.removedDisclaimer.property === 'search') {
      this.poPageList.clearInputSearch();
    }

    this.disclaimers = [];
    this.filter();
  }

  populateDisclaimers(filters: Array<any>): void {
    const property = filters.length > 1 ? 'advanced' : 'search';

    this.disclaimers = filters.map((value) => ({ value, property }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  resetFilterHiringProcess(): void {
    this.planning = [...this.hiringProcesses];
    this.situation = [];
  }
}
