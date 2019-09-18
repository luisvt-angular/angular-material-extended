import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatxCellDirective } from './matx-cell.directive';
import { MatxHeaderDirective } from './matx-header.directive';
import { MatxEditorDirective } from './matx-editor.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

// tslint:disable-next-line:directive-selector
@Directive({selector: 'matx-column'})
export class MatxColumnDirective {
  /** Handles if the column will be frozen at left or right */
  @Input() frozen: 'left' | 'right';

  /** Column field. It could be either direct property name or dot-property name */
  @Input() field: string;

  /** Column Header string */
  @Input() header: string;

  /** Column ngClass */
  @Input() ngClass: NgClass;

  /** Column ngStyle */
  @Input() ngStyle: { [klass: string]: any } = {};

  /** Column width */
  @Input() width: string;

  /**
   * Template used to create header containing custom html components:
   *
   * ```html
   * <matx-column field="name">
   *   <ng-template matxHeader><b>Name</b></ng-template>
   * </matx-column>
   * ```
   */
  @ContentChild(MatxHeaderDirective, {read: TemplateRef}) headerTemplate: TemplateRef<any>;

  /**
   * Template used to create cell containing custom html components:
   *
   * ```html
   * <matx-column>
   *   <ng-template matxCell let-player><b>{{player.name}}</b></ng-template>
   * </matx-column>
   * ```
   */
  @ContentChild(MatxCellDirective, {read: TemplateRef}) cellTemplate: TemplateRef<any>;

  /**
   * Template used when row is being edited:
   *
   * ```html
   * <matx-column field="national" header="National" [frozen]="nationalFrozenRight ? 'right' : null"
   *              [width]="nationalWidth">
   *     <ng-template matxEditor let-player>
   *       <matx-select hideRequiredMarker [(ngModel)]="player.national"
   *                    [options]="['Argentina', 'Portugal', 'England', 'Brazil', 'Germany', 'France', 'Holland']">
   *     </matx-select>
   *   </ng-template>
   * </matx-column>
   * ```
   */
  @ContentChild(MatxEditorDirective, {read: TemplateRef}) editorTemplate: TemplateRef<any>;

  private _sortBy: string | ((row1) => any);

  /**
   * Field name or function used to sort the column
   * <br>
   * The value could be a direct property:
   *  ```html
   *  <matx-column sortBy="name"></matx-column>
   *  ```
   *
   *  Or it could be a dot property:
   *  ```html
   *  <matx-column sortBy="user.name"></matx-column>
   *  ```
   *
   *  Or it could be a function:
   *  ```html
   *  <matx-column [sortBy]="sortByUserName"></matx-column>
   *  ```
   *  ```ts
   *  sortByUsername = (row) => row.user.name;
   *  ```
   *
   */
  get sortBy(): string | ((row1) => any) { return this.field || this._sortBy; }

  @Input() set sortBy(value: string | ((row1) => any)) { this._sortBy = value; }

  private _sortable: boolean;

  /** Determines if the column is sortable. If [sortBy] is present this attribute is ignored. */
  get sortable(): boolean { return this._sortable || !!this._sortBy; }

  @Input() set sortable(value: boolean) { this._sortable = coerceBooleanProperty(value); }

  sortDirection: 1 | 0 | -1 = 0;

  private _noPrintable: boolean;

  /** Determines if the column is not printable */
  get noPrintable(): boolean { return this._noPrintable; }

  @Input() set noPrintable(value: boolean) { this._noPrintable = coerceBooleanProperty(value); }
}
