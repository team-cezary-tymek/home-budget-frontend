import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { catchError, map, tap, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    private categoriesUrl = 'http://127.0.0.1:3000/categories'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        }
    }

    getCategories(): Observable<Category[]> {
        this.http.get<any>(this.categoriesUrl).subscribe(data => {
            console.log(data);
        })
        return this.http.get<any>(this.categoriesUrl)
    }

    createCategory(data: any): Observable<any> {
        return this.http.post(this.categoriesUrl, data, this.httpOptions).pipe(
            tap(_ => console.log("create")),
            catchError(this.handleError<any>('createCategory'))
        )
    }

    updateCategory(data: any): Observable<any> {
        return this.http.put(`${this.categoriesUrl}/${data.id}`, data, this.httpOptions).pipe(
            tap(_ => console.log("edit")),
            catchError(this.handleError<any>('editCategory'))
        )
    }


}
