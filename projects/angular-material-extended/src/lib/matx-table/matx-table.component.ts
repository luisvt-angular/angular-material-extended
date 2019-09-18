import {
  AfterContentChecked,
  AfterContentInit,
  Component, ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit, TemplateRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatxColumnDirective } from './matx-column.directive';
import { MatCheckboxChange } from '@angular/material';
import { MatxDetailRowDirective } from 'angular-material-extended/lib/matx-table/matx-detail-row.directive';
import { NgForm } from '@angular/forms';
import * as clone from 'clone';
import * as delay from 'delay';

@Component({
  selector: 'matx-table',
  templateUrl: './matx-table.component.html',
  styleUrls: ['./matx-table.component.scss']
})
export class MatxTableComponent implements OnInit, AfterContentChecked, OnDestroy {

  subscription: Subscription;

  @Input() set items(items: any[] | Observable<any[]>) {
    if (this.selectedRows) { this.selectedRows.clear(); }

    if (items instanceof Observable) {
      this.subscription = items.subscribe(this.mapRows)
    } else {
      this.mapRows(items);
    }
  }

  private mapRows = (items: any[]) =>
    this.rows = items.map(item => ({
      item,
      editing: false,
      creating: false,
      expanded: false
    }));

  @Input() editable: boolean | '';

  @Input() selectable: boolean | '';

  @Input() contentStyle: { [klass: string]: any } | string;

  @Input() frozenLeftStyle: { [klass: string]: any };

  @Input() frozenRightStyle: { [klass: string]: any };

  private get frozenLeftWidth() {
    let widths = this.frozenLeftColumns.map(c => c.width).filter(w => !!w);
    if (this.detailRow) widths.push('40px');
    if (this.selectable) widths.push('46px');
    if (widths.length) return 'calc(' + widths.join(' + ') + ')';
  }

  private get frozenRightWidth() {
    let widths = this.frozenRightColumns.map(c => c.width).filter(w => !!w);
    if (widths.length) return 'calc(' + widths.join(' + ') + ')';
  }

  @ContentChildren(MatxColumnDirective) columns: MatxColumnDirective[];

  frozenLeftColumns: MatxColumnDirective[] = [];

  scrollableColumns: MatxColumnDirective[] = [];

  frozenRightColumns: MatxColumnDirective[] = [];

  rows: MatxRow[] = [];

  selectedRows = new Set();

  get allSelected() {
    return this.rows.length === this.selectedRows.size;
  }

  get someSelected() {
    return this.selectedRows.size > 0 && !this.allSelected;
  }

  @ContentChild(MatxDetailRowDirective, {read: TemplateRef, static: true}) detailRow: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.frozenLeftColumns.length = 0;
    this.frozenRightColumns.length = 0;
    this.scrollableColumns.length = 0;
    this.columns.forEach(column => {
      if (column.frozenLeft) this.frozenLeftColumns.push(column);
      else if (column.frozenRight) this.frozenRightColumns.push(column);
      else this.scrollableColumns.push(column);

      if (column.width) column.ngStyle.flex = '0 ' + column.width;
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
    if (row.editing) return false;
    await delay(200);
    row.editing = true;
    await delay(1);
    this.columns.forEach(c => {
      if (c.model) form.addControl(c.model)
    });
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
    if (form.invalid) return;
    row.editing = false;
    delete row.originalValue;
  }
}

export interface MatxRow {
  item: any;
  originalValue?: any;
  editing: boolean;
  creating: boolean;
  expanded: boolean;
}
