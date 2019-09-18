import {
  AfterContentChecked,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef, ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatxColumnDirective } from './matx-column.directive';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatxDetailRowDirective } from './matx-detail-row.directive';
import { NgForm } from '@angular/forms';
import * as clone from 'clone';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { compare } from '../commons/compare';
import { get } from 'dot-prop';
import delay from 'delay';

@Component({
  selector: 'matx-table',
  templateUrl: './matx-table.component.html',
  styleUrls: ['./matx-table.component.scss']
})
export class MatxTableComponent implements AfterContentChecked, OnDestroy {

  private subscription: Subscription;

  get = get;

  @Input() set items(items: any[] | Observable<any[]>) {
    if (this.selectedRows) { this.selectedRows.clear(); }

    if (items instanceof Observable) {
      this.subscription = items.subscribe(this.mapRows);
    } else {
      this.mapRows(items);
      this.clonedRows = [...this.rows];
    }
  }

  private _editable: boolean;
  get editable(): boolean { return this._editable; }

  @Input() set editable(value: boolean) { this._editable = coerceBooleanProperty(value); }

  private _selectable: boolean;
  get selectable(): boolean { return this._selectable; }

  @Input() set selectable(value: boolean) { this._selectable = coerceBooleanProperty(value); }

  @Input() contentStyle: { [klass: string]: any } | string;

  @Input() frozenLeftStyle: { [klass: string]: any };

  @Input() frozenRightStyle: { [klass: string]: any };

  @Output() sort = new EventEmitter<MatxColumnDirective[]>();

  private sortedColumnsSet = new Set<MatxColumnDirective>();
  private sortedColumns: MatxColumnDirective[] = [];

  private get frozenLeftWidth() {
    const widths = this.frozenLeftColumns.map(c => c.width).filter(w => !!w);
    if (this.detailRow) { widths.push('40px'); }
    if (this._selectable) { widths.push('46px'); }
    if (widths.length) { return 'calc(' + widths.join(' + ') + ')'; }
  }

  private get frozenRightWidth() {
    const widths = this.frozenRightColumns.map(c => c.width).filter(w => !!w);
    if (widths.length) { return 'calc(' + widths.join(' + ') + ')'; }
  }

  @ContentChildren(MatxColumnDirective) columns: MatxColumnDirective[];

  frozenLeftColumns: MatxColumnDirective[] = [];

  scrollableColumns: MatxColumnDirective[] = [];

  frozenRightColumns: MatxColumnDirective[] = [];

  rows: MatxRow[] = [];

  private clonedRows: MatxRow[];

  selectedRows = new Set();

  get allSelected() {
    return this.rows.length === this.selectedRows.size;
  }

  get someSelected() {
    return this.selectedRows.size > 0 && !this.allSelected;
  }

  @ContentChild(MatxDetailRowDirective, {read: TemplateRef, static: true}) detailRow: TemplateRef<any>;

  @ViewChild('printable') printable: ElementRef<any>;

  printing = false;

  private mapRows = (items: any[]) =>
    this.rows = items.map(item => ({
      item,
      editing: false,
      creating: false,
      expanded: false
    }))

  ngAfterContentChecked(): void {
    // console.log('this.columns: ', this.columns);
    this.frozenLeftColumns.length = 0;
    this.frozenRightColumns.length = 0;
    this.scrollableColumns.length = 0;
    this.columns.forEach(column => {
      if (column.frozen === 'left') {
        this.frozenLeftColumns.push(column);
      } else if (column.frozen === 'right') {
        this.frozenRightColumns.push(column);
      } else {
        this.scrollableColumns.push(column);
      }

      if (column.width) { column.ngStyle.flex = '0 ' + column.width; }
    });
    this.frozenLeftStyle = {...this.frozenLeftStyle, ...{width: this.frozenLeftWidth}};
    this.frozenRightStyle = {...this.frozenRightStyle, ...{width: this.frozenRightWidth}};
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  toggleSelectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.rows.forEach(row => this.selectedRows.add(row));
    } else {
      this.selectedRows.clear();
    }
  }

  toggleSelectRow(row, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedRows.add(row);
    } else {
      this.selectedRows.delete(row);
    }
  }

  isRowSelected(row) {
    return this.selectedRows.has(row);
  }

  async startEditing(row: MatxRow, form: NgForm) {
    if (row.editing) { return false; }
    await delay(200);
    row.editing = true;
    await delay(1);
    row.originalValue = clone(form.value);
  }

  async resetRow(row: MatxRow, form: NgForm) {
    form.setValue(row.originalValue);
    delete row.originalValue;
    await delay(200);
    row.editing = false;
  }

  submitRow(row: MatxRow, form: NgForm) {
    if (form.invalid) { return; }
    row.editing = false;
    delete row.originalValue;
  }

  _sort(column: MatxColumnDirective) {
    if (!column.sortable) { return; }

    column.sortDirection = column.sortDirection === 0 ? 1
                         : column.sortDirection === 1 ? -1
                         : 0;

    if (column.sortDirection !== 0) {
      if (!this.sortedColumnsSet.has(column)) {
        this.sortedColumnsSet.add(column);
        this.sortedColumns.push(column);
      }
    } else {
      this.sortedColumnsSet.delete(column);
      this.sortedColumns.pop();
      if (!this.subscription) { this.rows = [...this.clonedRows]; }
    }

    if (this.subscription) {
      this.sort.emit(this.sortedColumns);
      return;
    }
    if (column.sortDirection === 0 && this.sortedColumns.length === 0) {
      return;
    }
    const fields = this.sortedColumns.map(c => typeof c.sortBy === 'function' ? c.sortBy : 'item.' + c.sortBy);
    this.rows.sort(compare(fields, this.sortedColumns.map(c => c.sortDirection)));
  }

  async print() {
    this.printing = true;
    await delay(200);
    const result = this.printable.nativeElement.innerHTML;
    const w = window.open();
    w.document.write(result);
    const style = w.document.createElement('style');
    style.appendChild(w.document.createTextNode(document.head.getElementsByTagName('style')[0].textContent));
    w.document.head.appendChild(style);
    const style2 = w.document.createElement('style');
    style2.appendChild(w.document.createTextNode(`
.mat-cell, .mat-header-cell {
  border-bottom: 3px solid rgba(0, 0, 0, 0.12);
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
}
.mat-cell {
  border-bottom-width: 1px
}`));
    w.document.head.appendChild(style2);
    w.print();
    w.close();
    this.printing = false;
  }
}

export interface MatxRow {
  item: any;
  originalValue?: any;
  editing: boolean;
  creating: boolean;
  expanded: boolean;
}
