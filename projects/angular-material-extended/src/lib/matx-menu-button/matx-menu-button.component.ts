import { Component, OnInit } from '@angular/core';
import { MatxSidenavMenuController } from '../controllers/matx-sidenav-menu.controller';

@Component({
  selector: 'matx-menu-button',
  templateUrl: './matx-menu-button.component.html'
})
export class MatxMenuButtonComponent implements OnInit {

  constructor(public sidenavMenuCtrl: MatxSidenavMenuController) { }

  ngOnInit() {
  }

}
