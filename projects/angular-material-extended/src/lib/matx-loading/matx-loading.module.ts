import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxLoadingComponent } from './matx-loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
