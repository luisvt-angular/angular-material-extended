import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxTextareaComponent } from './matx-textarea.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MatxTextareaComponent],
  exports: [
    MatxTextareaComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class MatxTextareaModule { }
