import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxSelectComponent } from './matx-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
