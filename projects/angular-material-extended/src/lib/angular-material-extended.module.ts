import { NgModule } from '@angular/core';
import { GmapAutocompleteModule } from './gmap-autocomplete/gmap-autocomplete.module';
import { InputModule } from './input/input.module';
import { GmapSearchDialogModule } from './gmap-search-dialog/gmap-search-dialog.module';

@NgModule({
  imports: [
    InputModule,
    GmapAutocompleteModule,
    GmapSearchDialogModule
  ],
  exports: [
    InputModule,
    GmapAutocompleteModule,
    GmapSearchDialogModule
  ]
})
export class AngularMaterialExtendedModule {
}
