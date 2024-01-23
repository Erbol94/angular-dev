import { Routes } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { MainLayoutComponent } from "../pages/main-layout/main-layout.component";
import { ErrorPageComponent} from "../pages/error-page/error-page.component";
import { authGuard } from "../shared/guards/auth.guard";
import { unAuthGuard } from "../shared/guards/un-auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent,
  }
];
