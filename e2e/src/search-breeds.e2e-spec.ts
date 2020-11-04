import { browser } from 'protractor';
import {AppPage} from './shared/app.po';
import {CatPage} from './shared/cat.po';

describe('search breeds test', () => {
  let app: AppPage;
  let catPage: CatPage;

  beforeAll(async () => {
    app = new AppPage();
    catPage = new CatPage();

    catPage.navigateToSearchBreeds();
  });

  it('should display result of search engine', () => {
    const {nameInput, submitBtn, result} = catPage.getElts().searchBreeds;

    app.setInput(nameInput, 'sib');
    submitBtn.click();

    expect(result.isDisplayed()).toBeTruthy();
  });
});
