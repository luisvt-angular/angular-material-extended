import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatxAutocompleteComponent } from './matx-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatxAutocompleteTemplateDirective } from './matx-autocomplete-template.directive';

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
  declarations: [MatxAutocompleteComponent, MatxAutocompleteTemplateDirective],
  exports: [MatxAutocompleteComponent, MatxAutocompleteTemplateDirective]
})
export class MatxAutocompleteModule { }
