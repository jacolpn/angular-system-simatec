import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoDynamicFormField, PoTableColumn } from '@po-ui/ng-components';

import { environment } from 'src/environments/environment';
import { Planning } from './planning.model';

@Injectable()
export class PoPageListService {
  constructor(private http: HttpClient) { }

  getPlanning() {
    return this.http.get<any>(`${environment.api}/planning`);
  }

  postPlanning(planning: Planning): Observable<string> {
    return this.http.post<any>(`${environment.api}/planning`, planning);
  }

  updateSituation(body: any): Observable<string> {
    return this.http.put<any>(`${environment.api}/planning`, body);
  }

  deletePlanning(id: String): Observable<string> {
    return this.http.delete<any>(`${environment.api}/planning/${id}`);
  }

  updateStartExecution(
    startExecution: Date,
    runtime: string,
    situation: string
  ): string {
    let dataStartExecution = new Date(startExecution);
    let dataHoje = new Date();
    let status;

    dataStartExecution.setDate(dataStartExecution.getDate() + parseInt(runtime));
    status = 'No prazo';

    if (dataStartExecution < dataHoje) {
      status = 'No prazo';
    }

    if (dataStartExecution > dataHoje) {
      status = 'Fora prazo';
    }

    if (situation == 'Concluido') {
      status = 'Concluido';
    }

    return status;
  }

  updateScheduleTomorrow(
    startExecution: Date,
    situation: string,
    priority: string,
    operationWeekend: string
  ): string {
    let dataStartExecution = new Date(startExecution);
    let dataHoje = new Date();
    let dataFindSemana;
    let scheduleTomorrow;

    dataFindSemana = dataHoje.getDay() == 0 || dataHoje.getDay() == 6 ? true : false;
    dataHoje.setDate(dataHoje.getDate() + 1);
    scheduleTomorrow = 'Não';

    if (situation != 'Concluido') {
      if (parseInt(priority) < 2 && dataStartExecution <= dataHoje) {
        if (dataFindSemana == true && operationWeekend == 'Sim') {
          scheduleTomorrow = 'Sim';
        }

        if (dataFindSemana == false && operationWeekend == 'Sim') {
          scheduleTomorrow = 'Sim';
        }

        if (dataFindSemana == true && operationWeekend == 'Não') {
          scheduleTomorrow = 'Sim';
        }
      }
    }

    return scheduleTomorrow;
  }

  getHireStatus() {
    return [
      { value: 'Concluido', label: 'Concluído' },
      { value: 'Em andamento', label: 'Em andamento' },
    ];
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'situation',
        label: 'Situação',
        type: 'subtitle',
        width: '100px',
        subtitles: [
          {
            value: 'Concluido',
            color: 'success',
            label: 'Concluído',
            content: '1',
          },
          {
            value: 'Em andamento',
            color: 'warning',
            label: 'Em andamento',
            content: '2',
          },
        ],
      },
      { property: 'description', label: 'Descrição', type: 'string' },
      { property: 'priority', label: 'Prioridade' },
      { property: 'responsible', label: 'Responsável' },
      { property: 'runtime', label: 'Tempo de execução' },
      {
        property: 'startExecution',
        label: 'Início de execução',
        type: 'date',
      },
      { property: 'status', label: 'Status' },
      { property: 'relationWork', label: 'Relação a obras' },
      { property: 'vehicle', label: 'Veículo' },
      { property: 'operationWeekend', label: 'Opera fim de semana' },
      { property: 'scheduleTomorrow', label: 'Programação para amanhã' },
    ];
  }

  getFields(): Array<PoDynamicFormField> {
    return [
      {
        label: 'Descrição *',
        property: 'description',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Prioridade *',
        property: 'priority',
        type: 'number',
        required: true,
        minLength: 1,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Responsável *',
        property: 'responsible',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Tempo de execução *',
        property: 'runtime',
        type: 'number',
        required: true,
        minLength: 1,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Início de execução *',
        property: 'startExecution',
        type: 'date',
        format: 'dd/mm/yyyy',
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Relação a obras *',
        property: 'relationWork',
        required: true,
        gridColumns: 6,
        gridSmColumns: 12,
        options: ['Sim', 'Não'],
        order: 1,
      },
      {
        label: 'Veículo *',
        property: 'vehicle',
        required: true,
        minLength: 2,
        maxLength: 50,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1,
      },
      {
        label: 'Opera fim de semana *',
        property: 'operationWeekend',
        required: true,
        gridColumns: 6,
        gridSmColumns: 12,
        options: ['Sim', 'Não'],
        order: 1,
      },
    ];
  }
}
