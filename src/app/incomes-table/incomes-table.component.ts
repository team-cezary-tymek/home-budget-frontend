import { INCOMES } from '../income_data';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
<<<<<<< Updated upstream
    name: string;
    value: number;
    date: Date;
=======
  row: {name: string;
    value: number;
    date: Date;}
  save: any;
>>>>>>> Stashed changes
}

@Component({
    selector: 'app-incomes-table',
    templateUrl: './incomes-table.component.html',
    styleUrls: ['./incomes-table.component.scss']
})
export class IncomesTableComponent {
<<<<<<< Updated upstream
    displayedColumns: string[] = ['id', 'name', 'value', 'date', 'edit'];
    incomes = new MatTableDataSource(INCOMES);
    name?: string;
    value?: number;
    date?: Date;
=======
  displayedColumns: string[] = ['id', 'name', 'value', 'date', 'edit'];
  incomes = new MatTableDataSource(INCOMES);
  name?: string;
  value?: number;
  date?: Date;
  save = true;
>>>>>>> Stashed changes

    constructor(private _liveAnnouncer: LiveAnnouncer,
        public dialog: MatDialog) {
    }

    @ViewChild(MatSort)
    sort!: MatSort;

    ngAfterViewInit() {
        this.incomes.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

<<<<<<< Updated upstream
    openDialog(row: any): void {
        const dialogRef = this.dialog.open(IncomeDialog, {
            data: row,
        });
=======
  openDialog(row: any): void {
    if (row == 0) {
      this.save = false;
    }
    else {
      this.save = true;
    }
    const dialogRef = this.dialog.open(IncomeDialog, {
      data: {row: row, save: this.save}
    });
>>>>>>> Stashed changes

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
        });
    }
}

@Component({
    selector: 'income-dialog',
    templateUrl: 'income-dialog.html',
    styleUrls: ['./income-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule],
    providers: [MatDatepickerModule, MatNativeDateModule]
})
export class IncomeDialog {
<<<<<<< Updated upstream
    constructor(
        public dialogRef: MatDialogRef<IncomeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }
=======
  buttonText = "Save";
  constructor(
    public dialogRef: MatDialogRef<IncomeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    if (data.save == false) {
      this.buttonText = "Add";
  }
  }
>>>>>>> Stashed changes

    onNoClick(): void {
        this.dialogRef.close();
    }
}

