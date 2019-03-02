import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatxPromptComponent } from './matx-prompt.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { MatxAutocompleteModule } from '../matx-autocomplete/matx-autocomplete.module';
import { MatxSelectModule } from '../matx-select/matx-select.module';
import { MatxInputModule } from '../matx-input/matx-input.module';

@NgModule({
  declarations: [MatxPromptComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatxAutocompleteModule,
    MatButtonModule,
    MatxSelectModule,
    MatxInputModule
  ],
  entryComponents: [
    MatxPromptComponent
  ]
})
export class MatxPromptModule { }