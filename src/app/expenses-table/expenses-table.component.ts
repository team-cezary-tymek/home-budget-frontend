import { Expense } from '../expense';
import { EXPENSES } from '../expense_data';
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
  category: string;
  value: number;
  date: Date;
}

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'value', 'date', 'edit'];
  expenses = new MatTableDataSource(EXPENSES);
  constructor(private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog) {}
  @ViewChild(MatSort)
  sort!: MatSort;
  name?: string;
  category?: string;
  value?: number;
  date?: Date;

  ngAfterViewInit() {
    this.expenses.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialog, {
      data: {name: this.name, category: this.category, value: this.value, date: this.date},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }
}

@Component({
  selector: 'expense-dialog',
  templateUrl: 'expense-dialog.html',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatDialogModule],
})
export class ExpenseDialog {
  constructor(
    public dialogRef: MatDialogRef<ExpenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


