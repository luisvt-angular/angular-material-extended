import { NgModule } from '@angular/core';
import { MatxGmapAutocompleteModule } from './matx-gmap-autocomplete/matx-gmap-autocomplete.module';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxGmapSearchDialogModule } from './matx-gmap-search-dialog/matx-gmap-search-dialog.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';

@NgModule({
  imports: [
    MatxInputModule,
    MatxGmapAutocompleteModule,
    MatxGmapSearchDialogModule,
    MatxErrorsModule
  ],
  exports: [
    MatxInputModule,
    MatxGmapAutocompleteModule,
    MatxGmapSearchDialogModule,
    MatxErrorsModule
  ]
})
export class MatxModule {
}
