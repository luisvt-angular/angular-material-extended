import { NgModule } from '@angular/core';
import { GmapAutocompleteComponent } from './gmap-autocomplete.component';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AgmCoreModule
  ],
  declarations: [GmapAutocompleteComponent],
  exports: [GmapAutocompleteComponent]
})
export class GmapAutocompleteModule {
}
