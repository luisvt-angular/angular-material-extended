import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxDatepickerComponent } from './matx-datepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatxErrorsModule } from '../matx-errors/matx-errors.module';

@NgModule({
  declarations: [MatxDatepickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatxErrorsModule,
  ],
  exports: [MatxDatepickerComponent]
})
export class MatxDatepickerModule { }
