import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from './login.component';
import {LOGIN_ROUTES} from './login.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTES)
  ]
})
export class LoginModule { }
