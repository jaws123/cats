import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xApiKey = this.authService.getXApiKey();
    if (xApiKey) {
      request = request.clone({
        setHeaders: {
          'x-api-key': xApiKey
        }
      });
    }
    return next.handle(request);
  }
}
