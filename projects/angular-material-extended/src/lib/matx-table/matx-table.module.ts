import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxTableComponent } from './matx-table.component';
import { MatxColumnDirective } from './matx-column.directive';
import { MatxDetailRowDirective } from './matx-detail-row.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatxCellDirective } from './matx-cell.directive';
import { MatxHeaderDirective } from './matx-header.directive';
import { MatxEditorDirective } from './matx-editor.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MatxTableComponent,
    MatxColumnDirective,
    MatxDetailRowDirective,
    MatxCellDirective,
    MatxHeaderDirective,
    MatxEditorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatxTableComponent,
    MatxColumnDirective,
    MatxDetailRowDirective,
    MatxCellDirective,
    MatxHeaderDirective,
    MatxEditorDirective
  ]
})
export class MatxTableModule { }
