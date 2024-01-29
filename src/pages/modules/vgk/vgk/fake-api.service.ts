import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private http: HttpClient) { }

  getData(url: string){
    return this.http.get<any>(url).pipe(
      retry(3), 
      catchError(this.handleError)
    );
  }

  postData(url: string, body: object ){
    return this.http.post<any>(url, body).pipe(catchError(this.handleError))
  }

  deleteData(url:string, id:number){
    const urlDelete = `${url}/${id}`
    return this.http.delete<any>(urlDelete).pipe(catchError(this.handleError))
  }

  getDataById(url:string, id:number){
    const urlId = `${url}/${id}`;
    return this.http.get<any>(urlId)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
