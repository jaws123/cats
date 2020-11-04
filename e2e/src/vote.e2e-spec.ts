import {AppPage} from './shared/app.po';
import {browser} from 'protractor';
import {CatPage} from './shared/cat.po';

describe('vote test', () => {
  let app: AppPage;
  let catPage: CatPage;

  beforeAll(async () => {
    app = new AppPage();
    catPage = new CatPage();
  });

  it('should display new image after vote', () => {
    const {image, voteBtn1, voteBtn2} = catPage.getElts().vote;
    const src1 = image.getAttribute('src');

    voteBtn1.click();
    browser.driver.sleep(5000);

    const src2 = image.getAttribute('src');
    expect(src1).not.toEqual(src2);

    voteBtn2.click();
    browser.driver.sleep(5000);

    const src3 = image.getAttribute('src');
    expect(src2).not.toEqual(src3);
  });
});
