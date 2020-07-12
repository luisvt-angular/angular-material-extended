import { NgModule } from '@angular/core';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';
import { MatxAutocompleteModule } from './matx-autocomplete/matx-autocomplete.module';
import { MatxBackButtonComponent } from './matx-back-button/matx-back-button.component';
import { MatxMenuButtonComponent } from './matx-menu-button/matx-menu-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatxPromptModule } from './matx-prompt/matx-prompt.module';
import { MatxSelectModule } from './matx-select/matx-select.module';
import { MatxDatepickerModule } from './matx-datepicker/matx-datepicker.module';
import { MatxLoadingModule } from './matx-loading/matx-loading.module';
import { MatxTextareaModule } from './matx-textarea/matx-textarea.module';
import { MatxNavTreeComponent } from './matx-nav-tree/matx-nav-tree.component';
import { MatListModule } from '@angular/material/list';

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
    MatxTextareaModule,
    MatListModule
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
    MatxNavTreeComponent
  ],
  declarations: [
    MatxBackButtonComponent,
    MatxMenuButtonComponent,
    MatxNavTreeComponent
  ],
})
export class MatxModule {
}
