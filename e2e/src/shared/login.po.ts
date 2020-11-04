import {by, element} from 'protractor';

export class LoginPage {

  getElts() {
    return {
      subIdInput: element(by.xpath('//body/app-root[1]/app-login[1]/form[1]/input[1]')),
      xApiKeyInput: element(by.xpath('//body/app-root[1]/app-login[1]/form[1]/input[2]')),
      submitBtn: element(by.xpath('//button[contains(text(),"Submit")]')),
      errorMsg: element(by.xpath('//div[contains(text(),"Authentication error. Please try again.")]'))
    };
  }
}
