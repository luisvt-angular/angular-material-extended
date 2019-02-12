import { NgModule } from '@angular/core';
import { MatxInputComponent } from './matx-input.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [MatxInputComponent],
  exports: [MatxInputComponent]
})
export class MatxInputModule {
}
