import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';

import { Planning } from './planning.model';
import { PoPageListService } from './po-page-list.service';

@Injectable()
export class OfflineService {
  constructor(
    private poNotification: PoNotificationService,
    private poPageListService: PoPageListService
  ) { }

  getItemsOffline(): Array<object> {
    return [
      {
        id: '1',
        situation: 'Concluido',
        description: 'ACPO Home',
        priority: '1-iniciar agora',
        responsible: 'João, José',
        runtime: '10',
        startExecution: '2021-08-15 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '2',
        situation: 'Em andamento',
        description: 'ACPO Exemplo 002',
        priority: '1-iniciar agora',
        responsible: 'Maria',
        runtime: '20',
        startExecution: '2021-08-15 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '3',
        situation: 'Em andamento',
        description: 'Exemplo 003',
        priority: '2-iniciar na data programada',
        responsible: 'Jurema, Maradona',
        runtime: '30',
        startExecution: '2021-08-15 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '4',
        situation: 'Em andamento',
        description: 'Exemplo 005',
        priority: '2-iniciar na data programada',
        responsible: 'Pelé, Bill Gates',
        runtime: '30',
        startExecution: '2021-02-08 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '5',
        situation: 'Concluido',
        description: 'Exemplo 009',
        priority: '1-iniciar agora',
        responsible: 'Joelma, Frederico',
        runtime: '50',
        startExecution: '2021-02-08 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '6',
        situation: 'Em andamento',
        description: 'Projeto teste',
        priority: '1-iniciar agora',
        responsible: 'Jorgita',
        runtime: '10',
        startExecution: '2021-02-08 04:00:00.000',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Empresa',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
      {
        id: '7',
        situation: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '25',
        startExecution: '2021-02-08 04:00:00.000',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim',
      },
    ];
  }

  getPlanningOffline(): Array<object> {
    return this.getItemsOffline();
  }

  postPlanningOffline(planningLocale: Array<object>, planning: Planning): number {
    this.poNotification.success('Programação salva com sucesso!');

    return planningLocale.push(planning);
  }

  deletePlanningOffline(planningLocale: Array<object>, selectedPlanning: object): object {
    var indice = planningLocale.indexOf(selectedPlanning);

    this.poNotification.success('Programação removida com sucesso!');

    return planningLocale.splice(indice, 1);
  }

  setSituation(selectedPlanning: any): void {
    switch (selectedPlanning['situation']) {
      case 'Concluido':
        selectedPlanning['situation'] = 'Em andamento';
        selectedPlanning['scheduleTomorrow'] =
          this.poPageListService.updateScheduleTomorrow(
            selectedPlanning['startExecution'],
            selectedPlanning['situation'],
            selectedPlanning['priority'],
            selectedPlanning['operationWeekend']
          );

        this.poNotification.warning('Programação em andamento!');
        break;

      case 'Em andamento':
        selectedPlanning['situation'] = 'Concluido';
        selectedPlanning['scheduleTomorrow'] =
          this.poPageListService.updateScheduleTomorrow(
            selectedPlanning['startExecution'],
            selectedPlanning['situation'],
            selectedPlanning['priority'],
            selectedPlanning['operationWeekend']
          );

        this.poNotification.success('Programação concluída com sucesso!');
        break;
    }
  }
}
