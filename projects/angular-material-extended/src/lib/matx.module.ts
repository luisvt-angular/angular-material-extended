import { NgModule } from '@angular/core';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';
import { MatxAutocompleteModule } from './matx-autocomplete/matx-autocomplete.module';
import { MatxBackButtonComponent } from './matx-back-button/matx-back-button.component';
import { MatxMenuButtonComponent } from './matx-menu-button/matx-menu-button.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatxInputModule,
    MatxErrorsModule,
    MatxAutocompleteModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatxInputModule,
    MatxErrorsModule,
    MatxAutocompleteModule,
    MatxMenuButtonComponent,
    MatxBackButtonComponent
  ],
  declarations: [MatxBackButtonComponent, MatxMenuButtonComponent]
})
export class MatxModule {
}
