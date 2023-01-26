import { Category } from '../category';
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
import { CategoryService } from '../category.service';
import { Observable, of } from 'rxjs';
import { ExpenseService } from '../expense.service';

export interface DialogData {
    row: {
        name: string;
        description: string;
    }
    save: any;
}

@Component({
    selector: 'app-category-table',
    templateUrl: './category-table.component.html',
    styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {

    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    categories_data: Category[];

    ngOnInit(): void {
        this.getCategories();
    }

    processCategory(category: any): Category {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            created_at: category.created_at,
            updated_at: category.updated_at,
        };
    }

    categories: any;

    getCategories(): void {
        this.categoryService.getCategories()
            .subscribe(categories => {
                this.categories_data = categories;
                this.categories = new MatTableDataSource(this.categories_data.map((category) => this.processCategory(category)));
                this.categories.sort = this.sort;
            }
            );
        /* expenses.map((expense) => this.processExpense(expense)) */
        console.log(this.categories);
    }

    delete(data: any): void {
        this.categoryService.deleteCategory(data)
            .subscribe(() => {
                this.getCategories();
            })
    }

    displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
    buttonText = 'Save';

    constructor(private _liveAnnouncer: LiveAnnouncer,
        public dialog: MatDialog, private categoryService: CategoryService) { }
    @ViewChild(MatSort)
    sort!: MatSort;
    name?: string;
    description?: string;
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
        const dialogRef = this.dialog.open(CategoryDialog, {
            data: { row: row, save: this.save },
        }
        );

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
            this.getCategories();
        });
    }

    openDialog2(): void {

        const dialogRef = this.dialog.open(CategoryAddDialog, {
            data: {},
        }
        );

        dialogRef.afterClosed().subscribe(result => {
            this.name = result;
            this.getCategories();
        });
    }
}

@Component({
    selector: 'category-dialog',
    templateUrl: 'category-dialog.html',
    styleUrls: ['./category-dialog.component.scss'],
    //styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class CategoryDialog {
    buttonText = "Save";
    updated: any = {
        name: "",
        description: "",
    }

    constructor(
        public dialogRef: MatDialogRef<CategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private categoryService: CategoryService,
    ) {
        this.updated = { ...data.row }
    }

    modify() {
        console.log(this.updated);
        this.categoryService.updateCategory(this.updated)
            .subscribe(() => {
                console.log("Updated category!");
            })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'category-add-dialog',
    templateUrl: 'category-add-dialog.html',
    styleUrls: ['./category-dialog.component.scss'],
    //styleUrls: ['./expense-dialog.component.scss'],
    standalone: true,
    imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
    providers: [MatDatepickerModule, MatNativeDateModule, {
        provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }]
})
export class CategoryAddDialog {
    buttonText = "Save";
    updated: any = {
        name: "",
        description: "",
    }

    constructor(
        public dialogRef: MatDialogRef<CategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private categoryService: CategoryService,
    ) {
    }

    create() {
        this.categoryService.createCategory(this.updated)
            .subscribe(() => {
                console.log("Created category!");
            })
    }


    onNoClick(): void {
        this.dialogRef.close();
    }
}
