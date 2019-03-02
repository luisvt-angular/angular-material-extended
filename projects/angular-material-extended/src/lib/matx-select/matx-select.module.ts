import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxSelectComponent } from './matx-select.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MatxSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [MatxSelectComponent]
})
export class MatxSelectModule { }
