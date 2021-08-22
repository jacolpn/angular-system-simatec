import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';

import { InsertPlanning } from './insert-planning.model';
import { InsertPlanningService } from './insert.planning.service';

@Component({
  selector: 'app-insert-planning',
  templateUrl: './insert-planning.component.html',
  styleUrls: ['./insert-planning.component.css']
})
export class InsertPlanningComponent implements OnInit {
    person = {};
    fields: Array<PoDynamicFormField> = [
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
          format: 'mm/dd/yyyy',
          gridColumns: 6,
          gridSmColumns: 12,
          errorMessage: 'The date must be before the year 2010.',
          order: 1
        },
        {
          label: 'Status',
          property: 'status',
          required: true,
          minLength: 2,
          maxLength: 50,
          gridColumns: 6,
          gridSmColumns: 12,
          order: 1
        },
        {
          label: 'Relação a obras',
          property: 'relationWork',
          required: true,
          minLength: 2,
          maxLength: 50,
          gridColumns: 6,
          gridSmColumns: 12,
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
          minLength: 2,
          maxLength: 50,
          gridColumns: 6,
          gridSmColumns: 12,
          order: 1
        },
        {
          label: 'Programação para amanhã',
          property: 'scheduleTomorrow',
          required: true,
          minLength: 2,
          maxLength: 50,
          gridColumns: 6,
          gridSmColumns: 12,
          order: 1
        }
    ];

    constructor(public poNotification: PoNotificationService, private insertPlanningService: InsertPlanningService) { }

    ngOnInit() { }

    sendPlanning(insertPlanning: InsertPlanning) {
        this.insertPlanningService
            .postPlanning(insertPlanning)
            .subscribe({
                    next: (value) => this.poNotification.success('Data saved successfully!'),
                    error: err => console.log(err)
            });
    }
}