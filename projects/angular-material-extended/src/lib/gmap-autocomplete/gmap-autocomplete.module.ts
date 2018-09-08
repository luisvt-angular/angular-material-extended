import { NgModule } from '@angular/core';
import { GmapAutocompleteComponent } from './gmap-autocomplete.component';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule, MatProgressSpinnerModule, MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { GmapSearchDialogModule } from '../gmap-search-dialog/gmap-search-dialog.module';


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
    AgmCoreModule,
    GmapSearchDialogModule
  ],
  declarations: [GmapAutocompleteComponent],
  exports: [GmapAutocompleteComponent]
})
export class GmapAutocompleteModule {
}
