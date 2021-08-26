import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoDynamicFormField, PoTableColumn } from '@po-ui/ng-components';

import { environment } from 'src/environments/environment';
import { Planning } from './planning.model';

@Injectable()
export class PoPageListService {
  constructor(private http: HttpClient) { }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'concluded',
        label: 'Concluído',
        type: 'subtitle',
        width: '100px',
        subtitles: [
          { value: 'Concluido', color: 'success', label: 'Concluído', content: '1' },
          { value: 'Em andamento', color: 'warning', label: 'Em andamento', content: '2' }
        ]
      },
      { property: 'description', label: 'Descrição', type: 'string' },
      { property: 'priority', label: 'Prioridade' },
      { property: 'responsible', label: 'Responsável' },
      { property: 'runtime', label: 'Tempo de execução' },
      { property: 'startExecution', label: 'Início de execução', type: 'date' },
      { property: 'status', label: 'Status' },
      { property: 'relationWork', label: 'Relação a obras' },
      { property: 'vehicle', label: 'Veículo' },
      { property: 'operationWeekend', label: 'Opera fim de semana' },
      { property: 'scheduleTomorrow', label: 'Programação para amanhã' }
    ];
  }

  getFields(): Array<PoDynamicFormField> {
    return [
      {
        label: 'Descrição',
        property: 'description',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        label: 'Prioridade',
        property: 'priority',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        label: 'Responsável',
        property: 'responsible',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        label: 'Tempo de execução',
        property: 'runtime',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        property: 'startExecution',
        label: 'Início de execução',
        type: 'date',
        format: 'dd/mm/yyyy',
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        label: 'Relação a obras',
        property: 'relationWork',
        required: true,
        gridColumns: 6,
        gridSmColumns: 12,
        options: ['Sim', 'Não'],
        order: 1
      },
      {
        label: 'Veículo',
        property: 'vehicle',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        label: 'Opera fim de semana',
        property: 'operationWeekend',
        required: true,
        gridColumns: 6,
        gridSmColumns: 12,
        options: ['Sim', 'Não'],
        order: 1
      }
    ];
  }

  getHireStatus() {
    return [
      { value: 'Concluido', label: 'Concluído' },
      { value: 'Em andamento', label: 'Em andamento' }
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
        runtime: '10',
        startExecution: '2021-08-15 04:00:00.000',
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
        runtime: '20',
        startExecution: '2021-08-15 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '3',
        concluded: 'Em andamento',
        description: 'Exemplo 003',
        priority: '2-iniciar na data programada',
        responsible: 'Jurema, Maradona',
        runtime: '30',
        startExecution: '2021-08-15 04:00:00.000',
        status: 'No Prazo',
        relationWork: 'Sim',
        vehicle: 'Vai direto',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      },
      {
        id: '4',
        concluded: 'Em andamento',
        description: 'Exemplo 005',
        priority: '2-iniciar na data programada',
        responsible: 'Pelé, Bill Gates',
        runtime: '30',
        startExecution: '2021-02-08 04:00:00.000',
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
        runtime: '50',
        startExecution: '2021-02-08 04:00:00.000',
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
        runtime: '10',
        startExecution: '2021-02-08 04:00:00.000',
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
        runtime: '25',
        startExecution: '2021-02-08 04:00:00.000',
        status: 'Fora do prazo',
        relationWork: 'Sim',
        vehicle: 'Ka Hatch',
        operationWeekend: 'Não',
        scheduleTomorrow: 'Sim'
      }
    ];
  }

  getPlanningHTTP() {
    return this.http.get<any>(`${environment.api}/planning`);
  }

  postPlanning(planning: Planning): Observable<string> {
    return this.http.post<any>(`${environment.api}/planning`, planning);
  }

  putPlanning(id: String): Observable<string> {
    return this.http.put<any>(`${environment.api}/planning`, id);
  }
}
