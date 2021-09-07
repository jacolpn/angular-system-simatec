import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { PoPageListService } from './page-list/po-page-list.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    PageListComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [PoPageListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
