import { NgModule } from '@angular/core';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';
import { MatxAutocompleteModule } from './matx-autocomplete/matx-autocomplete.module';
import { MatxBackButtonModule } from './matx-back-button/matx-back-button.module';
import { MatxMenuButtonModule } from './matx-menu-button/matx-menu-button.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatxPromptModule } from './matx-prompt/matx-prompt.module';
import { MatxSelectModule } from './matx-select/matx-select.module';
import { MatxDatepickerModule } from './matx-datepicker/matx-datepicker.module';
import { MatxLoadingModule } from './matx-loading/matx-loading.module';
import { MatxTextareaModule } from './matx-textarea/matx-textarea.module';
import { MatxNavTreeModule } from './matx-nav-tree/matx-nav-tree.module';
import { MatxTableModule } from './matx-table/matx-table.module';

@NgModule({
  exports: [
    MatxInputModule,
    MatxErrorsModule,
    MatxAutocompleteModule,
    MatxMenuButtonModule,
    MatxBackButtonModule,
    MatxSelectModule,
    MatxPromptModule,
    MatxLoadingModule,
    MatxDatepickerModule,
    MatxTextareaModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatxNavTreeModule,
    MatxTableModule
  ]
})
export class MatxModule {
}
