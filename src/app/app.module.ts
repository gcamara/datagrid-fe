import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GSControlsModule, GsrButtonModule, GsrCalendarModule, GsrCardModule, GsrCheckboxModule, GsrDataGridModule, GsrDropdownModule, GsrKebabMenuModule, SharedModule } from 'gs-angular-controls';
import { AppComponent } from './app.component';
import { EeCardTabComponent } from './employee-card/ee-card-tab/ee-card-tab.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCardComponent,
    EeCardTabComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GSControlsModule,
    GsrCardModule,
    GsrCalendarModule,
    GsrDataGridModule,
    GsrDropdownModule,
    GsrButtonModule,
    SharedModule,
    GsrKebabMenuModule,
    FormsModule,
    ReactiveFormsModule,
    GsrCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
