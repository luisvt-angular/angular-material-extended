import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatxSidenavMenuController } from '../../projects/angular-material-extended/src/public_api';
import { MediaMatcher } from '@angular/cdk/layout';

declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuItems = [
    {name: 'Input', url: '/matx-input'},
    {name: 'Autocomplete', url: '/matx-autocomplete'},
    {name: 'Gmap-Autocomplete', url: '/matx-gmap-autocomplete'},
    {name: 'Back-Button', url: '/matx-back-button'},
    {name: 'Menu-Button', url: '/matx-menu-button'},
    {name: 'Select', url: '/matx-select'},
    {name: 'Prompt', url: '/matx-prompt'},
  ];

  sources = {
    '/matx-input': {
      html: require('!raw-loader!./matx-input-demo/matx-input-demo.component.html'),
      ts: require('!raw-loader!./matx-input-demo/matx-input-demo.component.ts')
    },
    '/matx-autocomplete': {
      html: require('!raw-loader!./matx-autocomplete-demo/matx-autocomplete-demo.component.html'),
      ts: require('!raw-loader!./matx-autocomplete-demo/matx-autocomplete-demo.component.ts')
    },
    '/matx-gmap-autocomplete': {
      html: require('!raw-loader!./matx-gmap-autocomplete-demo/matx-gmap-autocomplete-demo.component.html'),
      ts: require('!raw-loader!./matx-gmap-autocomplete-demo/matx-gmap-autocomplete-demo.component.ts')
    },
    '/matx-back-button': {
      html: require('!raw-loader!./matx-back-button-demo/matx-back-button-demo.component.html'),
      ts: require('!raw-loader!./matx-back-button-demo/matx-back-button-demo.component.ts')
    },
    '/matx-menu-button': {
      html: require('!raw-loader!./matx-menu-button-demo/matx-menu-button-demo.component.html'),
      ts: require('!raw-loader!./matx-menu-button-demo/matx-menu-button-demo.component.ts')
    },
    '/matx-select': {
      html: require('!raw-loader!./matx-select-demo/matx-select-demo.component.html'),
      ts: require('!raw-loader!./matx-select-demo/matx-select-demo.component.ts')
    },
    '/matx-prompt': {
      html: require('!raw-loader!./matx-prompt-demo/matx-prompt-demo.component.html'),
      ts: require('!raw-loader!./matx-prompt-demo/matx-prompt-demo.component.ts')
    },
  };

  currentUrl: string;

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(router: Router,
              public sidenavMenuCtrl: MatxSidenavMenuController,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this._mobileQuery = media.matchMedia('(max-width: 992px)');
    sidenavMenuCtrl.isMobile = this._mobileQuery.matches;
    this._mobileQueryListener = () => {
      sidenavMenuCtrl.isMobile = this._mobileQuery.matches;
      sidenavMenuCtrl.opened = !sidenavMenuCtrl.isMobile;
      changeDetectorRef.detectChanges();
    };
    this._mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = router.url;
      }
    });
  }

  ngOnInit(): void {
  }

}
