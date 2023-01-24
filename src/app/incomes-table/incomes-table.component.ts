import { INCOMES } from '../income_data';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


export interface DialogData {
  name: string;
  value: number;
  date: Date;
}

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.scss']
})
export class IncomesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'value', 'date', 'edit'];
  incomes = new MatTableDataSource(INCOMES);
  name?: string;
  value?: number;
  date?: Date;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog) {}

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

  openDialog(): void {
    const dialogRef = this.dialog.open(IncomeDialog, {
      data: {name: this.name, value: this.value, date: this.date},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }
}

@Component({
  selector: 'income-dialog',
  templateUrl: 'income-dialog.html',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatDialogModule],
})
export class IncomeDialog {
  constructor(
    public dialogRef: MatDialogRef<IncomeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

