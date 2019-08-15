import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatxPromptComponent } from './matx-prompt.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { MatxAutocompleteModule } from '../matx-autocomplete/matx-autocomplete.module';
import { MatxSelectModule } from '../matx-select/matx-select.module';
import { MatxInputModule } from '../matx-input/matx-input.module';
import { MatxErrorsModule } from '../matx-errors/matx-errors.module';
import { MatxDatepickerModule } from '../matx-datepicker/matx-datepicker.module';
import { MatxTextareaModule } from '../matx-textarea/matx-textarea.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatxErrorsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatxAutocompleteModule,
    MatButtonModule,
    MatxSelectModule,
    MatxInputModule,
    MatxDatepickerModule,
    MatProgressSpinnerModule,
    MatxTextareaModule
  ],
  declarations: [MatxPromptComponent],
  exports: [MatxPromptComponent]
})
export class MatxPromptModule {}
