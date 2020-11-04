import {Routes} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';

export const APP_ROUTES: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'cat',
  loadChildren: () => import('./modules/cat/cat.module').then(mod => mod.CatModule),
  canLoad: [AuthGuard]
}, {
  path: 'login',
  loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule)
}, {
  path: '**',
  redirectTo: ''
}];
