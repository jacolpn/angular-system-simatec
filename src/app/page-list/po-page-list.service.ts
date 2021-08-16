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
          { value: 'Pendente', color: 'warning', label: 'Pendente', content: '2' }
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
      { value: 'Pendente', label: 'Pendente' }
    ];
  }

  getItems() {
    return [
      {
        id: '1',
        concluded: 'Concluido',
        description: 'ACPO Home',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'ACPO Exemplo 002',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Exemplo 003',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Exemplo 005',
        priority: '5',
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
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Projeto teste',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        id: '17',
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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
        concluded: 'Pendente',
        description: 'Buscar algo',
        priority: '5',
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