import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense';
import { catchError, map, tap, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    constructor(private http: HttpClient) { }

    private expensesUrl = 'http://127.0.0.1:3000/expenses'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getExpenses(): Observable<Expense[]> {
        this.http.get<any>(this.expensesUrl).subscribe(data => {
            console.log(data);
        })
        return this.http.get<any>(this.expensesUrl)
    }

    createExpense(data: any): Observable<any> {
        return this.http.post(this.expensesUrl, data, this.httpOptions).pipe(
            tap(_ => console.log("create")),
            catchError(this.handleError<any>('createExpense'))
        )
    }

    updateExpense(data: any): Observable<any> {
        return this.http.put(`${this.expensesUrl}/${data.id}`, data, this.httpOptions).pipe(
            tap(_ => console.log("update")),
            catchError(this.handleError<any>('updateExpense'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
