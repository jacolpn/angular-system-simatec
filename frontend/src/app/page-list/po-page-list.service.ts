import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';

@Injectable()
export class PoPageListService {
  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'concluded',
        label: 'Concluído',
        type: 'subtitle',
        subtitles: [
          { value: 'Concluido', color: 'success', label: 'Concluído', content: '1' },
          { value: 'Em andamento', color: 'warning', label: 'Em andamento', content: '2' },
          { value: 'Suspenso', color: 'danger', label: 'Suspenso', content: '3' }
        ]
      },
      { property: 'description', label: 'Descrição', type: 'string' },
      { property: 'priority', label: 'Prioridade' },
      { property: 'responsible', label: 'Responsável' },
      { property: 'runtime', label: 'Tempo de execução' },
      { property: 'startExecution', label: 'Início de execução' },
      { property: 'status', label: 'Status' },
      { property: 'relationWork', label: 'Relação a obras' },
      { property: 'vehicle', label: 'Veículo' },
      { property: 'operationWeekend', label: 'Opera fim de semana' },
      { property: 'scheduleTomorrow', label: 'Programação para amanhã' }
    ];
  }

  getHireStatus() {
    return [
      { value: 'Concluido', label: 'Concluído' },
      { value: 'Em andamento', label: 'Em andamento' },
      { value: 'Suspenso', label: 'Suspenso' }
    ];
  }

  getItems() {
    return [
      {
        id: '1',
        concluded: 'Concluido',
        description: 'ACPO Home',
        priority: '1-iniciar agora',
        responsible: 'João, José',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '2',
        concluded: 'Em andamento',
        description: 'ACPO Exemplo 002',
        priority: '1-iniciar agora',
        responsible: 'Maria',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '3',
        concluded: 'Suspenso',
        description: 'Exemplo 003',
        priority: '2-iniciar na data programada',
        responsible: 'Jurema, Maradona',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '4',
        concluded: 'Suspenso',
        description: 'Exemplo 005',
        priority: '2-iniciar na data programada',
        responsible: 'Pelé, Bill Gates',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '5',
        concluded: 'Concluido',
        description: 'Exemplo 009',
        priority: '1-iniciar agora',
        responsible: 'Joelma, Frederico',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '6',
        concluded: 'Em andamento',
        description: 'Projeto teste',
        priority: '1-iniciar agora',
        responsible: 'Jorgita',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Empresa',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '7',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '8',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '1-iniciar agora',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '9',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '10',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '11',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '12',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '13',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '14',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '15',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '16',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Fusca 98',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '17',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '18',
        concluded: 'Em andamento',
        description: 'Buscar algo',
        priority: '2-iniciar na data programada',
        responsible: 'Klarckson Neves',
        runtime: '730',
        startExecution: '01/02/20',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      }
    ];
  }
}