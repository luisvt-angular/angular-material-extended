import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxMenuButtonComponent } from './matx-menu-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatxSidenavMenuController } from '../controllers/matx-sidenav-menu.controller';



@NgModule({
  declarations: [MatxMenuButtonComponent],
  exports: [MatxMenuButtonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MatxMenuButtonModule { }
