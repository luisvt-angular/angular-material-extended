import { NgModule } from '@angular/core';
import { MatxGmapAutocompleteModule } from './matx-gmap-autocomplete/matx-gmap-autocomplete.module';
import { MatxGmapSearchDialogModule } from './matx-gmap-search-dialog/matx-gmap-search-dialog.module';

@NgModule({
  imports: [
    MatxGmapAutocompleteModule,
    MatxGmapSearchDialogModule
  ],
  exports: [
    MatxGmapAutocompleteModule,
    MatxGmapSearchDialogModule
  ]
})
export class MatxGmapModule { }
