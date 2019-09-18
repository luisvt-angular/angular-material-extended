import { NgModule } from '@angular/core';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';
import { MatxAutocompleteModule } from './matx-autocomplete/matx-autocomplete.module';
import { MatxBackButtonComponent } from './matx-back-button/matx-back-button.component';
import { MatxMenuButtonComponent } from './matx-menu-button/matx-menu-button.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatxPromptModule } from './matx-prompt/matx-prompt.module';
import { MatxSelectModule } from './matx-select/matx-select.module';
import { MatxDatepickerModule } from './matx-datepicker/matx-datepicker.module';
import { MatxLoadingModule } from './matx-loading/matx-loading.module';
import { MatxTextareaModule } from './matx-textarea/matx-textarea.module';
import { MatxTableModule } from './matx-table/matx-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatxInputModule,
    MatxErrorsModule,
    MatxAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatxSelectModule,
    MatxPromptModule,
    MatxLoadingModule,
    MatxDatepickerModule,
    MatxTextareaModule
  ],
  exports: [
    MatxInputModule,
    MatxErrorsModule,
    MatxAutocompleteModule,
    MatxMenuButtonComponent,
    MatxBackButtonComponent,
    MatxSelectModule,
    MatxPromptModule,
    MatxLoadingModule,
    MatxDatepickerModule,
    MatxTextareaModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatxTableModule
  ],
  declarations: [
    MatxBackButtonComponent,
    MatxMenuButtonComponent
  ],
})
export class MatxModule {
}
