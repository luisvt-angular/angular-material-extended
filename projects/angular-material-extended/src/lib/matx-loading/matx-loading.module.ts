import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxLoadingComponent } from './matx-loading.component';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [MatxLoadingComponent],
  entryComponents: [MatxLoadingComponent],
  exports: [MatxLoadingComponent]
})
export class MatxLoadingModule { }
