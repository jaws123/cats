import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {CatHttpService} from '@cat/services/cat-http.service';
import {ImageDto} from '@cat/dto/image-dto';
import {AuthService} from '@shared/services/auth.service';
import {VoteComponent} from './vote.component';
import {By} from '@angular/platform-browser';


describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let catHttpService;
  let authService;
  const subId = 'user-1';
  const IMAGE_MOCK: ImageDto = {
    id: 'xi12',
    url: 'https://cdn2.thecatapi.com/images/c3f.jpg',
    categories: null,
    breeds: null
  };
  const I_LIKE_IT_EXPECTED_REQUEST = {image_id: IMAGE_MOCK.id, sub_id: subId, value: 1};
  const I_DONT_LIKE_IT_EXPECTED_REQUEST = {image_id: IMAGE_MOCK.id, sub_id: subId, value: 0};

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('CatService', ['getSubId']);
    authService.getSubId.and.returnValue(subId);
    catHttpService = jasmine.createSpyObj('CatService', ['getImage', 'postVote']);
    catHttpService.getImage.and.returnValue(of([IMAGE_MOCK]));
    catHttpService.postVote.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [ VoteComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: CatHttpService, useValue: catHttpService },
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should vote "I like it" (unit test)', () => {
    component.iLikeIt();

    expect(catHttpService.postVote).toHaveBeenCalledWith(I_LIKE_IT_EXPECTED_REQUEST);
  });

  it('should vote "I dont like it" (unit test)', () => {
    component.iDontLikeIt();

    expect(catHttpService.postVote).toHaveBeenCalledWith(I_DONT_LIKE_IT_EXPECTED_REQUEST);
  });

  it('should vote "I like it" (integration test)', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.voteBtn'));

    buttons[0].triggerEventHandler('click', null);

    expect(catHttpService.postVote).toHaveBeenCalledWith(I_LIKE_IT_EXPECTED_REQUEST);
  });

  it('should vote "I dont like it" (integration test)', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.voteBtn'));

    buttons[1].triggerEventHandler('click', null);

    expect(catHttpService.postVote).toHaveBeenCalledWith(I_DONT_LIKE_IT_EXPECTED_REQUEST);
  });

  it('should return image to display', () => {
    expect(component.image.id).toEqual(IMAGE_MOCK.id);
    expect(component.image.url).toEqual(IMAGE_MOCK.url);
  });

  it('should display image', () => {
    expect(fixture.nativeElement.querySelector('img').src).toEqual(IMAGE_MOCK.url);
  });

});
