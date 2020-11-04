import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CatHttpService} from '@cat/services/cat-http.service';
import {environment} from '@env/environment';
import {AuthService} from '@shared/services/auth.service';
import {AuthInterceptor} from './auth-interceptor.service';

describe(`AuthHttpInterceptor`, () => {
  let catHttpService: CatHttpService;
  let httpMock: HttpTestingController;
  let authService;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getXApiKey']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CatHttpService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: AuthService, useValue: authService }
      ],
    });

    catHttpService = TestBed.get(CatHttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should not add x-api-key header', () => {
    authService.getXApiKey.and.returnValue('');
    catHttpService.getBreedsByName('sib').subscribe(() => {});

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}breeds/search?q=sib`);
    httpMock.verify();

    expect(httpRequest.request.headers.has('x-api-key')).toEqual(false);
  });

  it('should add x-api-key header and return data', () => {
    authService.getXApiKey.and.returnValue('X-API-KEY-DEMO2');
    catHttpService.getBreedsByName('sib').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response[0].name).toEqual('Siberian');
    });

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}breeds/search?q=sib`);
    httpRequest.flush([{description: 'The Siberians dog description.', name: 'Siberian'}]);
    httpMock.verify();

    expect(httpRequest.request.headers.has('x-api-key')).toEqual(true);
  });

});
