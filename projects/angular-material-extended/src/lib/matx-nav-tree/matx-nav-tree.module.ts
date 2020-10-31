import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxNavTreeComponent } from './matx-nav-tree.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MatxNavTreeComponent],
  exports: [MatxNavTreeComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ]
})
export class MatxNavTreeModule { }
