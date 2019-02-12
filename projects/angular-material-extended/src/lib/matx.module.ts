import { NgModule } from '@angular/core';
import { MatxInputModule } from './matx-input/matx-input.module';
import { MatxErrorsModule } from './matx-errors/matx-errors.module';

@NgModule({
  imports: [
    MatxInputModule,
    MatxErrorsModule
  ],
  exports: [
    MatxInputModule,
    MatxErrorsModule
  ]
})
export class MatxModule {
}
