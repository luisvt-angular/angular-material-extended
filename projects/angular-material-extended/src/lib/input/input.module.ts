import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [InputComponent],
  exports: [InputComponent]
})
export class InputModule {
}
