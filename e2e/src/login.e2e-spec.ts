import {AppPage} from './shared/app.po';
import {browser} from 'protractor';
import {LoginPage} from './shared/login.po';
import {LoginDto} from '../dto/login-dto';

describe('login test', () => {
  let app: AppPage;
  let loginPage: LoginPage;
  let loginData: LoginDto;

  beforeAll(async () => {
    app = new AppPage();
    loginPage = new LoginPage();

    loginData = await app.loadData('login.json') as any as LoginDto;
    app.navigateToLogin();
  });

  it('should not login', () => {
    const {subIdInput, xApiKeyInput, submitBtn, errorMsg} = loginPage.getElts();
    const {subId, xApiKey} = loginData.incorrectData;

    app.setInput(subIdInput, subId);
    app.setInput(xApiKeyInput, xApiKey);
    submitBtn.click();

    expect(errorMsg.isDisplayed()).toBeTruthy();
  });

  it('should login', () => {
    const {subIdInput, xApiKeyInput, submitBtn} = loginPage.getElts();
    const {subId, xApiKey} = loginData.correctData;

    app.setInput(subIdInput, subId);
    app.setInput(xApiKeyInput, xApiKey);
    submitBtn.click();

    expect(browser.getCurrentUrl()).toContain('cat');
  });
});
