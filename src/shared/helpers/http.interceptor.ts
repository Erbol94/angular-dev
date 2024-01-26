import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { StorageService} from "../services/storage.service";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  storageService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        const token = storageService.getToken();
        if (token) {
          const headers = req.headers.set('Authorization', `Basic ${token}`);
          req = req.clone({ headers });
        }
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      const error = e.error?.error?.message || e.statusText;
      if (e.status === 401) {
        storageService.removeToken();
        return throwError(() => 'Неправильный логин или пароль. Пожалуйста, попробуйте еще раз.');
      }
      return throwError(() => 'Произошла ошибка при выполнении запроса ' + error);
    })
  );
};
