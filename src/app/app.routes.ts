import { Routes } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { TestComponent} from "../pages/test/test.component";
import { MainLayoutComponent } from "../pages/main-layout/main-layout.component";
import { ErrorPageComponent } from "../pages/error-page/error-page.component";
import { authGuard } from "../shared/guards/auth.guard";
import { unAuthGuard } from "../shared/guards/un-auth.guard";
import { VgkComponent } from '../pages/vgk/vgk.component';
import { IdkComponent } from '../pages/idk/idk.component';
import { VgkViewComponent } from '../pages/vgk/vgk-view/vgk-view.component';
import { VgkAddComponent } from '../pages/vgk/vgk-add/vgk-add.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'vgk',
        component: VgkComponent,
        // canActivate: [unAuthGuard]
      },
      {
        path: 'vgk/:id',
        component: VgkViewComponent,
        // canActivate: [unAuthGuard]
      },
      {
        path: 'vgk-add',
        component: VgkAddComponent,
        // canActivate: [unAuthGuard]
      },
      {
        path: 'idk',
        component: IdkComponent,
        // canActivate: [unAuthGuard]
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unAuthGuard]
  },
  
  {
    path: '**',
    component: ErrorPageComponent,
  },

];
