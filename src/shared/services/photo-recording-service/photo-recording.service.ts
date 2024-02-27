import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoRecordingService {

  constructor(private http: HttpClient) { }

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
      "vehicleColor",
      "vehiclePhotoLicensePlate",
      "updateTime",
      "snapshotTime",
      "vehiclePhoto",
      "customsDepartment",
      "syscode",
      "removed",
      "createTime",
      "removedTime",
      "directionMovVehicle",
      "removedBy",
      "vehicleNumber",
      "vehicleModel",
      "vehicleCountry",
      "camera",
      "recordingMethod",
      "vehicleType"
    ],
    related: {},
  };
}
