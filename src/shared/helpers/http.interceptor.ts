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
        const csrfToken = storageService.getCsrfToken();
        if (csrfToken !== null) {
          req = req.clone({
            setHeaders: {
              'X-CSRF-TOKEN': csrfToken,
            },
          });
        }
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        storageService.removeCsrfToken();
        router.navigate(['']);
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
