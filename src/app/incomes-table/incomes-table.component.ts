import { INCOMES } from '../income_data';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { IncomeService } from '../income.service';
import { Income } from '../income';


export interface DialogData {
  row: {name: string;
    value: number;
    date: Date;}
  save: any;
}

@Component({
    selector: 'app-incomes-table',
    templateUrl: './incomes-table.component.html',
    styleUrls: ['./incomes-table.component.scss']
})
export class IncomesTableComponent {
    @Input()
    set refetch(event: any) {
        if (event) {
            console.log("hello!")
            this.getIncomes();
        }
    }

    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    incomes_data: Income[];

    ngOnInit(): void {
        this.getIncomes();
    }

    processIncome(income: any): Income {
        return {
            id: income.id,
            name: income.name,
            value: income.value,
            date: new Date(income.date),
            created_at: new Date(income.created_at),
            updated_at: new Date(income.updated_at),
        };
    }

    incomes: any;

    getIncomes(): void {
        this.incomeService.getIncomes()
            .subscribe(incomes => {
                this.incomes_data = incomes;
                this.incomes = new MatTableDataSource(this.incomes_data.map((income) => this.processIncome(income)));
                this.incomes.sort = this.sort;
            }
            );
        
        console.log(this.incomes);
    }

    displayedColumns: string[] = ['id', 'name', 'value', 'date', 'edit', 'delete'];
    name?: string;
    value?: number;
    date?: Date;
    save = true;

    constructor(private _liveAnnouncer: LiveAnnouncer,
        public dialog: MatDialog, private incomeService: IncomeService) {
    }

    @ViewChild(MatSort)
    sort!: MatSort;

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
        const dialogRef = this.dialog.open(IncomeDialog, {
            data: { row: row, save: this.save }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
            this.getIncomes();
        });
    }

    openDialog2(): void {
        const dialogRef = this.dialog.open(IncomeAddDialog, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
            this.getIncomes();
        });
    }
}

@Component({
    selector: 'income-dialog',
    templateUrl: 'income-dialog.html',
    styleUrls: ['./income-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class IncomeDialog {
    @Output() refetch: EventEmitter<any> = new EventEmitter();
    updated = {
        name: "",
        value: 0,
        date: new Date(""),
    };
    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<IncomeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private incomeService: IncomeService,
    ) {
        this.updated = { ...data.row }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    update(start_data: any) {
        this.incomeService.updateIncome(this.updated)
            .subscribe(() => this.refetch.emit())
    }
}

@Component({
    selector: 'income-add-dialog',
    templateUrl: 'income-add-dialog.html',
    styleUrls: ['./income-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class IncomeAddDialog {
    @Output() refetch: EventEmitter<any> = new EventEmitter();
    updated = {
        name: "",
        value: 0,
        date: new Date("")
    }
    buttonText = "Save";
    constructor(
        public dialogRef: MatDialogRef<IncomeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private incomeService: IncomeService,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    create() {
        this.incomeService.createIncome(this.updated)
            .subscribe(() => this.refetch.emit())
    }
}

