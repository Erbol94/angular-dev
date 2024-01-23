import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
          if (response) {
            const csrfToken: string | null = response.headers.get('X-CSRF-TOKEN');
            if (response.ok) {
              this.storageService.setCsrfToken(csrfToken);
            }
          }
          return response;
        }),
        catchError((error) => {
          const errorMessage = 'Неправильный логин или пароль. Пожалуйста, попробуйте еще раз.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  onLogout() {
    this.storageService.removeCsrfToken();
  }

  getData(): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': 'e781f25a61e54298bd0ced8b987dccc9'
    });

    console.log(headers)

    // Отправка запроса с установленным заголовком
    return this.http.get<any>('http://192.168.0.82:8080/smart-customs/ws/meta/fields/com.axelor.apps.registration.db.Vgk', { headers });
  }

}
