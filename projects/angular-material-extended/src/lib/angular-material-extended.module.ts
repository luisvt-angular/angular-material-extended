import { NgModule } from '@angular/core';
import { GmapAutocompleteModule } from './gmap-autocomplete/gmap-autocomplete.module';
import { InputModule } from './input/input.module';
import { GmapSearchDialogModule } from './gmap-search-dialog/gmap-search-dialog.module';
import { ErrorsModule } from './errors/errors.module';

@NgModule({
  imports: [
    InputModule,
    GmapAutocompleteModule,
    GmapSearchDialogModule,
    ErrorsModule
  ],
  exports: [
    InputModule,
    GmapAutocompleteModule,
    GmapSearchDialogModule,
    ErrorsModule
  ]
})
export class AngularMaterialExtendedModule {
}
