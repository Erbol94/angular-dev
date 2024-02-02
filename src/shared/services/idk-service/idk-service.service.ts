import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VgkServiceService {
  constructor(private http: HttpClient) {}

  postData(url: string, body: object) {
    return this.http.post<any>(url, body).pipe(catchError(this.handleError));
  }

  postDataById(url: string, id: number) {
    const urlId = `${url}/${id}/fetch`;
    return this.http.post(urlId,this.bodyById).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  bodyById = {
    fields: [
      'euro',
      'weightSystem',
      'axles',
      'modifierType',
      'photos',
      'modifierDate',
      'transportNumber',
      'prevVerID',
      'vehicleTstk',
      'trailerNumber',
      'weighingType',
      'actNumber',
      'photo',
      'addInfo',
      'updatedOn',
      'creatingDate',
      'overload',
      'customsDepartment',
      'transitViolations',
      'violation',
      'totalWeight',
      'modifierName',
      'category',
      'recordingMethod',
      'status',
      'dimensions',
    ],
    related: {},
  };
}
