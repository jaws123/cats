import {TestBed, getTestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  const routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    guard = injector.get(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not load module when unauthenticated user', () => {
    expect(guard.canLoad()).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should load module when authenticated user', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canLoad()).toEqual(true);
  });

  it('should redirect to login when unauthenticated user', () => {
    expect(guard.canActivate()).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access app when authenticated user', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });
});
