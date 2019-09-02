import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatxAutocompleteComponent } from './matx-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
  ],
  declarations: [MatxAutocompleteComponent],
  exports: [MatxAutocompleteComponent]
})
export class MatxAutocompleteModule { }
