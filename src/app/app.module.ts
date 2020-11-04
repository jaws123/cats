import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@shared/interceptors/auth-interceptor.service';
import {LoginModule} from '@login/login.module';
import {CatModule} from '@cat/cat.module';
import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CatModule,
    LoginModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
