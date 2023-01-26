import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from './income';
import { catchError, map, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  private incomesUrl = 'http://127.0.0.1:3000/incomes'
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getIncomes(): Observable<Income[]> {
    this.http.get<any>(this.incomesUrl).subscribe(data => {
        console.log(data);
    })
    return this.http.get<any>(this.incomesUrl)
}

updateIncome(data: any): Observable<any> {
  return this.http.put(`${this.incomesUrl}/${data.id}`, data, this.httpOptions).pipe(
      tap(_ => console.log("update")),
      catchError(this.handleError<any>('updateIncome'))
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
