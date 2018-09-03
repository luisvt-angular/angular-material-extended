import { NgModule } from '@angular/core';
import { InputComponent } from './matx-input/input.component';
import {MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MatInputModule,
    FormsModule
  ],
  declarations: [InputComponent],
  exports: [InputComponent]
})
export class AngularMaterialExtendedModule { }
