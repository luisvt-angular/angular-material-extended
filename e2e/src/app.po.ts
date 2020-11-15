import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  sideNavTitleText() {
    return element(by.css('app-root > mat-sidenav-container > mat-sidenav > div > mat-toolbar')).getText();
  }
}
