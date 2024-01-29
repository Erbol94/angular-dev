import { Routes } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { TestComponent} from "../pages/test/test.component";
import { MainLayoutComponent } from "../pages/main-layout/main-layout.component";
import { ErrorPageComponent } from "../pages/error-page/error-page.component";
import { authGuard } from "../shared/guards/auth.guard";
import { unAuthGuard } from "../shared/guards/un-auth.guard";
import { VgkComponent } from '../pages/modules/vgk/vgk/vgk.component';
import { IdkComponent } from '../pages/modules/idk/idk/idk.component';
import { VgkViewComponent } from '../pages/modules/vgk/vgk/vgk-view/vgk-view.component';
import { VgkAddComponent } from '../pages/modules/vgk/vgk/vgk-add/vgk-add.component';


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
      },
      {
        path: 'vgk/:id',
        component: VgkViewComponent,
      },
      {
        path: 'vgk-add',
        component: VgkAddComponent,
      },
      {
        path: 'idk',
        component: IdkComponent,
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
