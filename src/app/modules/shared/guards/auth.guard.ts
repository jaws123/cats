import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService,
              private route: Router) {
  }

  canLoad(): boolean {
    return this.checkAuthentication();
  }

  canActivate(): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.route.navigate(['/login']);
    }

    return isLoggedIn;
  }
}
