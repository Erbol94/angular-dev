import { CanActivateFn, Router } from '@angular/router';
import { StorageService} from "../services/storage.service";
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  storageService.isAuthentication.subscribe({
    next: (value) => {
      if (!value) {
        router.navigateByUrl('login');
      }
    },
  });

  return true;
};


