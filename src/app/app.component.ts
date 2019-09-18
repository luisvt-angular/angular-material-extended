import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatxSidenavMenuController } from 'angular-material-extended';
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
    {name: 'Datepicker', url: '/matx-datepicker'},
    {name: 'Autocomplete', url: '/matx-autocomplete'},
    {name: 'Gmap-Autocomplete', url: '/matx-gmap-autocomplete'},
    {name: 'Back-Button', url: '/matx-back-button'},
    {name: 'Menu-Button', url: '/matx-menu-button'},
    {name: 'Select', url: '/matx-select'},
    {name: 'Prompt', url: '/matx-prompt'},
    {name: 'Nav Tree', url: '/matx-nav-tree'},
    {name: 'Table', url: '/matx-table'},
  ];

  sources: {[url: string]: {html: { default: string }, ts: { default: string }}} = {
    '/matx-input': {
      html: require('!raw-loader!./matx-input-demo/matx-input-demo.component.html'),
      ts: require('!raw-loader!./matx-input-demo/matx-input-demo.component.ts')
    },
    '/matx-datepicker': {
      html: require('!raw-loader!./matx-datepicker-demo/matx-datepicker-demo.component.html'),
      ts: require('!raw-loader!./matx-datepicker-demo/matx-datepicker-demo.component.ts')
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
    '/matx-nav-tree': {
      html: require('!raw-loader!./matx-nav-tree-demo/matx-nav-tree-demo.component.html'),
      ts: require('!raw-loader!./matx-nav-tree-demo/matx-nav-tree-demo.component.ts')
    },
    '/matx-table': {
      html: require('!raw-loader!./matx-table-demo/matx-table-demo.component.html'),
      ts: require('!raw-loader!./matx-table-demo/matx-table-demo.component.ts')
    },
  };

  currentUrl: string;

  constructor(router: Router,
              public sidenavMenuCtrl: MatxSidenavMenuController) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = router.url;
      }
    });
  }

  ngOnInit(): void {
  }

}
