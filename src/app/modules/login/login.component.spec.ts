import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CatHttpService} from '@cat/services/cat-http.service';
import {of, throwError} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let catHttpService;
  const AUTHENTICATION_ERROR_RESPONSE = { message: 'AUTHENTICATION_ERROR - no valid x-api-key in header',
                                          headers: {'Access-Control-Allow-Origin': '*'},
                                          status: 401,
                                          level: 'info' };
  const AUTHENTICATION_ERROR_MSG = 'Authentication error. Please try again.';

  beforeEach(async(() => {
    catHttpService = jasmine.createSpyObj('CatService', ['getVotes']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: CatHttpService, useValue: catHttpService }
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test validity form', () => {
    const form = component.loginForm;
    const subIdControl = form.controls.subId;
    const xApiKeyControl = form.controls.xApiKey;
    expect(form.valid).toBeFalsy();

    subIdControl.setValue('');
    xApiKeyControl.setValue('');
    expect(subIdControl.valid).toBeFalsy();
    expect(xApiKeyControl.valid).toBeFalsy();

    subIdControl.setValue('user-1');
    xApiKeyControl.setValue('X-API-KEY-DEMO');
    expect(subIdControl.valid).toBeTruthy();
    expect(xApiKeyControl.valid).toBeTruthy();
    expect(form.valid).toBeTruthy();
  });

  it('should login (unit test)', () => {
    spyOn(router, 'navigate');
    catHttpService.getVotes.and.returnValue(of([]));

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/cat/vote']);
  });

  it('should login (integration test)', () => {
    const subIdInput = fixture.debugElement.nativeElement.querySelector('input[formControlName=subId]');
    const xApiKeyInput = fixture.debugElement.nativeElement.querySelector('input[formControlName=xApiKey]');
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(router, 'navigate');
    catHttpService.getVotes.and.returnValue(of([]));

    expect(component.loginForm.valid).toBeFalsy();
    subIdInput.value = 'user-1';
    subIdInput.dispatchEvent(new Event('input'));
    xApiKeyInput.value = 'X-API-KEY-DEMO';
    xApiKeyInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/cat/vote']);
  });

  it('should return authentication error message', () => {
    catHttpService.getVotes.and.returnValue(throwError(AUTHENTICATION_ERROR_RESPONSE));

    component.onSubmit();

    expect(component.errorMsg).toEqual(AUTHENTICATION_ERROR_MSG);
  });

  it('should display authentication error message', () => {
    catHttpService.getVotes.and.returnValue(throwError(AUTHENTICATION_ERROR_RESPONSE));

    component.onSubmit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.errorMsg').textContent).toEqual(AUTHENTICATION_ERROR_MSG);
  });

});
