import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxBackButtonComponent } from './matx-back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [MatxBackButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [MatxBackButtonComponent]
})
export class MatxBackButtonModule { }
