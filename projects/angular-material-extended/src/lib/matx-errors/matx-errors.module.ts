import { NgModule } from '@angular/core';
import { MatxErrorsComponent } from './matx-errors.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MatxErrorsComponent],
  exports: [MatxErrorsComponent]
})
export class MatxErrorsModule {
}
