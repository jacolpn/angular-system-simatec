import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PoPageListService } from './page-list/po-page-list.service';
import { InsertPlanningComponent } from './insert-planning/insert-planning.component';
import { InsertPlanningService } from './insert-planning/insert.planning.service';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    PageListComponent,
    InsertPlanningComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [PoPageListService, InsertPlanningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
