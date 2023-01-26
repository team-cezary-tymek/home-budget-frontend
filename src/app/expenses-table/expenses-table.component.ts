import { Expense } from '../expense';
import { EXPENSES } from '../expense_data';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ExpenseService } from '../expense.service';
import { Observable, of } from 'rxjs';

export interface DialogData {
    row: {
        name: string;
        category: string;
        value: number;
        date: Date;
    }
    save: any;
}

@Component({
    selector: 'app-expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent {

    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    expenses_data: Expense[];

    ngOnInit(): void {
        this.getExpenses();
    }

    processExpense(expense: any): Expense {
        return {
            id: expense.id,
            name: expense.name,
            category: expense.category.name,
            value: expense.value,
            date: new Date(expense.date),
            created_at: new Date(expense.created_at),
            updated_at: new Date(expense.updated_at),
        };
    }

    expenses: any;

    getExpenses(): void {
        this.expenseService.getExpenses()
            .subscribe(expenses => {
                this.expenses_data = expenses;
                this.expenses = new MatTableDataSource(this.expenses_data.map((expense) => this.processExpense(expense)));
                this.expenses.sort = this.sort;
            }
            );
        /* expenses.map((expense) => this.processExpense(expense)) */
        console.log(this.expenses);
    }

    displayedColumns: string[] = ['id', 'name', 'category', 'value', 'date', 'edit', 'delete'];
    buttonText = 'Save';

    constructor(private _liveAnnouncer: LiveAnnouncer,
        public dialog: MatDialog, private expenseService: ExpenseService) { }
    @ViewChild(MatSort)
    sort!: MatSort;
    name?: string;
    category?: string;
    value?: number;
    date?: Date;
    save = true;
    ngAfterViewInit() {
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    openDialog(row: any): void {
        if (row == 0) {
            this.save = false;
        }
        else {
            this.save = true;
        }
        const dialogRef = this.dialog.open(ExpenseDialog, {
            data: { row: row, save: this.save },
        }
        );

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
        });
    }
    openDialog2(): void {
        const dialogRef = this.dialog.open(ExpenseAddDialog, {
            data: {},
        }
        );

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
        });
    }

}

@Component({
    selector: 'expense-dialog',
    templateUrl: 'expense-dialog.html',
    styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class ExpenseDialog {
    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<ExpenseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
        if (data.save == false) {
            this.buttonText = "Add";
        }
        else {
            this.buttonText = "Save";
        }
    }


    onNoClick(): void {
        this.dialogRef.close();
        if (this.data.save == false) {
            this.buttonText = "Add";
        }
        else {
            this.buttonText = "Save";
        }
    }
}

@Component({
    selector: 'expense-add-dialog',
    templateUrl: 'expense-add-dialog.html',
    styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class ExpenseAddDialog {
    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<ExpenseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}


