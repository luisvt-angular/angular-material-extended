import { NgModule } from '@angular/core';
import { MatxInputComponent } from './matx-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
