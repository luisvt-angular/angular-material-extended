import { NgModule } from '@angular/core';
import { ErrorsComponent } from './errors.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ErrorsComponent],
  exports: [ErrorsComponent]
})
export class ErrorsModule {
}
