import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { debounceTime, delay, filter, map, skip, switchMap, take, tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipList } from "@angular/material/chips";

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
    // @ts-ignore
    this._multiple = value || value === '';
  }

  private _repeatable: boolean;

  get repeatable(): boolean {
    return this._repeatable;
  }

  @Input() set repeatable(value) {
    // @ts-ignore
    this._repeatable = value || value === '';
  }

  @Input() placeholder: string;

  @Input() label: string;

  @Input() displayField: string;

  @Input() filterBy: (filterVal: string) => Observable<any[]>;

  @Input() options: any[];

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

  @Input() autocomplete: string = 'off';

  private _filterChange$ = new BehaviorSubject<string>(null);

  private _disabled: boolean;

  get disabled(): boolean | '' {
    return this._disabled;
  }

  @Input() set disabledControl(disabled: '' | boolean) {
    this.disabled = disabled;
  }

  @Input() set disabled(disabled: '' | boolean) {
    this._disabled = disabled === '' || disabled === true;
  }

  private _displayWith: Function;

  get displayWith(): Function {
    return option =>
      !option ? '' : typeof option === 'string' ? option
        : this._displayWith
          ? this._displayWith(option)
          : option[this.displayField];
  }

  @Input() set displayWith(_displayWith: Function) {
    this._displayWith = _displayWith;
  }

  loading = false;

  _selectedValue;

  _selectedOptions = [];

  private _selectionFired = false;

  private subscription: Subscription;

  @ViewChild('inputEl', {static: false}) inputEl;

  @ViewChild('autocompleteTrigger', {static: true}) autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild('chipList', {static: false}) chipList: MatChipList;

  @ViewChild('chipListModel', {static: false}) chipListModel: NgModel;

  @ContentChild(NgControl,  {static: true}) ngControl: NgControl;

  constructor(_renderer: Renderer2,
              _elementRef: ElementRef) {
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
      this.ngControl.control.statusChanges.subscribe(status => {
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
      if (value) this._selectedOptions.push(value);
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
    if (!this.multiple) this._selectedValue = null;
    this._filterChange$.next('');
    this.chipList._onChange(this._selectedValue);
    this.onChange(this._selectedValue);
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  editSelected(selectedIndex: number) {
    this.inputEl.nativeElement.value = this.displayWith(this._selectedOptions[selectedIndex]);
    this.removeSelected(selectedIndex);
    this._filterBy();
    setTimeout(() => this.inputEl.nativeElement.focus());
  }
}
