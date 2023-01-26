import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { MatTableModule } from '@angular/material/table';
import { IncomesTableComponent } from './incomes-table/incomes-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
    declarations: [
        AppComponent,
        ExpensesTableComponent,
        IncomesTableComponent,
        DashboardComponent,
        BarChartComponent,
        PieChartComponent,
        StatisticsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [MatDatepickerModule, MatNativeDateModule, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
