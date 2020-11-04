import { APP_URL, ASSETS } from '../../config';
import {browser, ElementFinder} from 'protractor';
import * as json from 'load-json-file';

export class AppPage {
  navigateTo(url = browser.baseUrl) {
    return browser.get(url) as Promise<any>;
  }

  navigateToLogin() {
    return browser.get(`${APP_URL}login`) as Promise<any>;
  }

  setInput(ef: ElementFinder, value: string) {
    ef.clear();
    ef.sendKeys(value);
  }

  async loadData(fileName: string) {
    return await json(ASSETS + fileName).then((data) => {
      return data;
    });
  }
}
