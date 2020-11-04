import {browser, by, element} from 'protractor';

export class CatPage {

  getElts() {
    return {
      navigation: {
        vote: element(by.xpath('//a[contains(text(),"Vote")]')),
        searchBreeds: element(by.xpath('//a[contains(text(),"Search breeds")]'))
      },
      searchBreeds: {
        nameInput: element(by.xpath('//body/app-root[1]/app-cat[1]/app-search-breeds[1]/form[1]/input[1]')),
        submitBtn: element(by.xpath('//button[contains(text(),"Submit")]')),
        result: element(by.xpath('//body/app-root[1]/app-cat[1]/app-search-breeds[1]/div[1]/div[1]'))
      },
      vote: {
        image: element(by.xpath('//body/app-root[1]/app-cat[1]/app-vote[1]/div[2]/img[1]')),
        voteBtn1: element(by.xpath('//button[contains(text(),"I like it")]')),
        voteBtn2: element(by.xpath('//button[contains(text(),"I don\'t like it")]'))
      }
    };
  }

  navigateToSearchBreeds() {
    const {searchBreeds} = this.getElts().navigation;
    searchBreeds.click();
    browser.driver.sleep(5000);
  }

  navigateToVote() {
    const {vote} = this.getElts().navigation;
    vote.click();
    browser.driver.sleep(5000);
  }
}
