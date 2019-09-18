import { ContentChild, Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { isEmptyOrTrue } from 'angular-material-extended/lib/commons/is-empty-or-true';
import { MatxCellDirective } from 'angular-material-extended/lib/matx-table/matx-cell.directive';
import { MatxHeaderDirective } from 'angular-material-extended/lib/matx-table/matx-header.directive';
import { MatxEditorDirective } from 'angular-material-extended/lib/matx-table/matx-editor.directive';
import { NgModel } from '@angular/forms';

@Directive({selector: 'matx-column'})
export class MatxColumnDirective {
  private _frozenLeft: boolean;

  get frozenLeft(): boolean {
    return this._frozenLeft;
  }

  @Input() set frozenLeft(value: boolean) {
    this._frozenLeft = isEmptyOrTrue(value);
  }

  private _frozenRight: boolean;

  get frozenRight(): boolean {
    return this._frozenRight;
  }

  @Input() set frozenRight(value: boolean) {
    this._frozenRight = isEmptyOrTrue(value);
  }

  @Input() field: string;

  @Input() header: string;

  @Input() ngClass: NgClass;

  @Input() ngStyle: { [klass: string]: any } = {};

  @Input() width: string;

  @ContentChild(MatxHeaderDirective, {read: TemplateRef, static: true}) headerTemplate: TemplateRef<any>;

  @ContentChild(MatxCellDirective, {read: TemplateRef, static: false}) cellTemplate: TemplateRef<any>;

  @ContentChild(MatxEditorDirective, {read: TemplateRef, static: false}) editorTemplate: TemplateRef<any>;

  @ContentChild(NgModel, {read: NgModel, static: false}) model: NgModel;

}
