import { CanActivateFn, Router } from '@angular/router';
import { StorageService} from "../services/storage.service";
import { inject } from '@angular/core';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  storageService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        router.navigateByUrl('').then(r => console.log(r));
      }
    },
  });

  return true;
};
