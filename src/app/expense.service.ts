import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    constructor(private http: HttpClient) { }

    private expensesUrl = 'http://127.0.0.1:3000/expenses'

    getExpenses(): Observable<Expense[]> {
        this.http.get<any>(this.expensesUrl).subscribe(data => {
            console.log(data);
        })
        return this.http.get<any>(this.expensesUrl)
    }
}
