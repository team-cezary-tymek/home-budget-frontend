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
import { EventEmitter } from '@angular/core';
import { InputDecorator } from '@angular/core';
import { OutputDecorator } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Category } from '../category';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { CategoryScale } from 'chart.js';
import { RefetchService } from '../refetch.service';

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
    @Input()
    set refetch(event: any) {
        if (event) {
            console.log("hello!")
            this.getExpenses();
        }
    }

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

    delete(data: any): void {
        this.expenseService.deleteExpense(data)
            .subscribe(() => {
                this.getExpenses();
            })
    }

    displayedColumns: string[] = ['id', 'name', 'category', 'value', 'date', 'edit', 'delete'];
    buttonText = 'Save';

    constructor(private _liveAnnouncer: LiveAnnouncer,
        public dialog: MatDialog, private expenseService: ExpenseService, private refetchService: RefetchService) {
            this.refetchService.refetch$.subscribe(() => {
                this.getExpenses();
            })
         }
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
            this.getExpenses();
        });
    }
    openDialog2(): void {
        const dialogRef = this.dialog.open(ExpenseAddDialog, {
            data: {},
        }
        );

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
            this.getExpenses();
        });
    }

}

@Component({
    selector: 'expense-dialog',
    templateUrl: 'expense-dialog.html',
    styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})

export class ExpenseDialog {
    @Output() refetch: EventEmitter<any> = new EventEmitter();
    updated: any = {
        name: "",
        value: 0,
        date: new Date(""),
        category: "",
    };

    categories: Category[];
    selected: Category;

    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<ExpenseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private expenseService: ExpenseService,
        private categoryService: CategoryService,
    ) {
        this.updated = { ...data.row }
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.getCategories();
    }

    update(start_data: any) {
        console.log(this.selected);
        this.updated["category_id"] = this.selected;
        console.log(this.updated);
        this.expenseService.updateExpense(this.updated)
            .subscribe(() => this.refetch.emit())
    }

    getCategories(): void {
        this.categoryService.getCategories()
            .subscribe((categories: any) => {
                this.categories = categories;
            }
            );
    }
}

@Component({
    selector: 'expense-add-dialog',
    templateUrl: 'expense-add-dialog.html',
    styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class ExpenseAddDialog {
    @Output() refetch: EventEmitter<any> = new EventEmitter();
    updated: any = {
        name: "",
        value: 0,
        date: new Date(""),
        category: "",
    };

    categories: Category[];
    selected: Category;

    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<ExpenseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private expenseService: ExpenseService,
        private categoryService: CategoryService,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.getCategories();
    }

    create() {
        this.updated["category_id"] = this.selected;
        this.expenseService.createExpense(this.updated)
            .subscribe(() => this.refetch.emit())
    }

    getCategories(): void {
        this.categoryService.getCategories()
            .subscribe((categories: any) => {
                this.categories = categories;
            }
            );
    }
}


