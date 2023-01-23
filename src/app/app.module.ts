import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { MatTableModule } from '@angular/material/table';
import { IncomesTableComponent } from './incomes-table/incomes-table.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    ExpensesTableComponent,
    IncomesTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatSlideToggleModule, 
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
