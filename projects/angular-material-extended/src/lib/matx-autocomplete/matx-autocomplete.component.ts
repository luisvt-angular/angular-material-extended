import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, skip, switchMap, tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatxAutocompleteTemplateDirective } from './matx-autocomplete-template.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatChipList } from '@angular/material/chips';

@Component({
  selector: 'matx-autocomplete',
  templateUrl: './matx-autocomplete.component.html',
  styleUrls: ['./matx-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxAutocompleteComponent), multi: true}]
})
export class MatxAutocompleteComponent extends DefaultValueAccessor implements OnInit, AfterViewInit, OnDestroy {

  filteredOptions: any[] = [];

  readonly separatorKeysCodes = [ENTER, COMMA];

  @Input() required: boolean | '';

  private _multiple: boolean;

  get multiple(): boolean {
    return this._multiple;
  }

  @Input() set multiple(value) {
    this._multiple = coerceBooleanProperty(value);
  }

  private _repeatable: boolean;

  get repeatable(): boolean {
    return this._repeatable;
  }

  @Input() set repeatable(value) {
    this._repeatable = coerceBooleanProperty(value);
  }

  @Input() placeholder: string;

  @Input() label: string;

  @Input() displayField: string;

  @Input() filterBy: (filterVal: string) => Observable<any[]>;

  @Input() options: any[];

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

  @Input() autocomplete = 'off';

  private _filterChange$ = new BehaviorSubject<string>(null);

  private _disabled: boolean;

  get disabled(): boolean {
    return this._disabled;
  }
  @Input() set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }


  @Input() set disabledControl(disabled: boolean) {
    this.disabled = disabled;
  }

  private _displayWith: (option?: any) => string;

  get displayWith(): (option?: any) => string {
    return option =>
      !option ? '' : typeof option === 'string' ? option
        : this._displayWith
          ? this._displayWith(option)
          : option[this.displayField];
  }

  @Input() set displayWith(_displayWith: (option?: any) => string) {
    this._displayWith = _displayWith;
  }

  loading = false;

  _selectedValue;

  _selectedOptions = [];

  private subscription: Subscription;

  @ViewChild('inputEl') inputEl;

  @ViewChild('autocompleteTrigger', {static: true}) autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild('chipList') chipList: MatChipList;

  @ViewChild('chipListModel') chipListModel: NgModel;

  @ContentChild(NgControl, {static: true}) ngControl: NgControl;

  @Input() set template(template: TemplateRef<any>) { this._template = template; }

  @ContentChild(MatxAutocompleteTemplateDirective, {read: TemplateRef, static: true})
  _template: TemplateRef<any>;

  @Input() optionStyle: { [klass: string]: any; } | null;

  @Input() chipStyle: { [klass: string]: any; } | null;

  constructor(_renderer: Renderer2,
              _elementRef: ElementRef<HTMLElement>) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit() {
    if (this.options) {
      this.subscription = this._filterChange$.pipe(skip(1)).subscribe(value => {
        this.filteredOptions = this.options.filter(option =>
          this.displayWith(option).toLowerCase()
            .includes(value.toLowerCase()));
        this.autocompleteTrigger.openPanel();
      });
    } else {
      this.subscription = this._filterChange$.pipe(
        skip(1),
        tap(() => this.loading = true),
        debounceTime(500),
        switchMap(value => this.filterBy(value)),
      ).subscribe(values => {
        this.loading = false;
        this.filteredOptions = values;
        this.autocompleteTrigger.openPanel();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.control.statusChanges.subscribe(() => {
        this.chipListModel.control.setErrors(this.ngControl.errors);
      });
      setTimeout(() => {
        this.chipListModel.control.setErrors(this.ngControl.errors);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  _filterBy() {
    this._filterChange$.next(this.inputEl.nativeElement.value);
  }

  search(event: MouseEvent) {
    event.stopPropagation();
    this._filterBy();
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    if (this.multiple && !this.inputEl.nativeElement.value) {
      this._selectedOptions = [];
    }
    this.inputEl.nativeElement.value = '';
    this._filterChange$.next('');
    this.onChange(null);
  }

  writeValue(value) {
    if (this.multiple) {
      this._selectedValue = this._selectedOptions = value;
    } else {
      this._selectedValue = value;
      if (value) { this._selectedOptions.push(value); }
    }
  }

  selectOption(event: MatAutocompleteSelectedEvent) {
    if (this._multiple) {
      if (this.repeatable || !this._selectedOptions.some(o => event.option.viewValue === this.displayWith(o))) {
        this._selectedOptions.push(event.option.value);
      }
    } else {
      this._selectedValue = event.option.value;
      this._selectedOptions[0] = this._selectedValue;
    }
    this.inputEl.nativeElement.value = '';
    setTimeout(() => this.chipList.writeValue(this._selectedValue));
    // this.chipList._onChange(this._selectedValue);
    this.onChange(this._selectedValue);
  }

  removeSelected(selectedIndex: number) {
    this._selectedOptions.splice(selectedIndex, 1);
    if (!this.multiple) { this._selectedValue = null; }
    this._filterChange$.next('');
    this.chipList._onChange(this._selectedValue);
    this.onChange(this._selectedValue);
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  editSelected(selectedIndex: number) {
    if (this.disabled) { return; }
    this.inputEl.nativeElement.value = this.displayWith(this._selectedOptions[selectedIndex]);
    this.removeSelected(selectedIndex);
    this._filterBy();
    setTimeout(() => this.inputEl.nativeElement.focus());
  }
}
