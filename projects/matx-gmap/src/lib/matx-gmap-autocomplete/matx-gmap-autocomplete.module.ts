import { NgModule } from '@angular/core';
import { MatxGmapAutocompleteComponent } from './matx-gmap-autocomplete.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  declarations: [MatxGmapAutocompleteComponent],
  exports: [MatxGmapAutocompleteComponent]
})
export class MatxGmapAutocompleteModule {
}
