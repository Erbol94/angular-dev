import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {map} from 'rxjs/operators';
import {StorageService} from "./storage.service";
import {ILogin} from "../../pages/login/models/auth.mode";
import {apiEndpoint} from "../constants/constants";


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor( private http: HttpClient, private storageService: StorageService) {}

  onLogin(data: ILogin) {
    return this.http
      .post<HttpResponse<any>>(`${apiEndpoint.AuthEndpoint.login}`, data, { observe: 'response' })
      .pipe(
        map((response) => {
          if (response.ok) {
            this.storageService.setToken(response.body);
          }
          return response;
        }),
        catchError((error) => {
          console.log(error);
          const customError = {
            message: 'Произошла ошибка в аутентификации.',
            originalError: error || '',
          };
          return throwError(() => customError);
        })
      );
  }

  onLogout() {
    this.storageService.removeToken();
    window.location.reload();
  }

  getData(): Observable<any> {
    // Отправка запроса с установленным заголовком
    return this.http.get<any>('http://192.168.0.82:8080/smart-customs/ws/meta/fields/com.axelor.apps.registration.db.Vgk', {
      observe: 'response',
    });
  }

}
