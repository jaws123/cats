import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CatHttpService} from '@cat/services/cat-http.service';
import {SearchBreedsComponent} from './search-breeds.component';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('SearchBreedsComponent', () => {
  let component: SearchBreedsComponent;
  let fixture: ComponentFixture<SearchBreedsComponent>;
  let catHttpService;

  beforeEach(async(() => {
    catHttpService = jasmine.createSpyObj('CatService', ['getBreedsByName']);

    TestBed.configureTestingModule({
      declarations: [ SearchBreedsComponent ],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a cat', () => {
    const nameInput = fixture.debugElement.query(By.css('input'));
    const btn = fixture.debugElement.query(By.css('button'));
    catHttpService.getBreedsByName.and.returnValue(of([{description: 'The Siberians dog description.', name: 'Siberian'}]));

    nameInput.nativeElement.value = 'sib';
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    const cats = fixture.debugElement.queryAll(By.css('.cat'));
    expect(cats.length).toEqual(1);
    expect(cats[0].nativeElement.textContent).toContain('The Siberians dog description.');
  });
});
