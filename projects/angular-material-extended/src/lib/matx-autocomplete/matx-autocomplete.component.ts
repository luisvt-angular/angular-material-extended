import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { debounceTime, delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'matx-autocomplete',
  templateUrl: './matx-autocomplete.component.html',
  styleUrls: ['./matx-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxAutocompleteComponent), multi: true}]
})
export class MatxAutocompleteComponent extends DefaultValueAccessor implements OnInit, OnDestroy {

  formControl = new FormControl();

  filteredOptions: any[] = [];

  readonly separatorKeysCodes = [ENTER, COMMA];

  @Input() required: boolean | '';

  private _multiple: boolean | '';

  get multiple(): boolean | '' {
    return this._multiple;
  }

  @Input() set multiple(value: boolean | '') {
    this._multiple = value || value === '';
  }

  private _repeatable: boolean | '';

  get repeatable(): boolean | "" {
    return this._repeatable;
  }

  @Input() set repeatable(value: boolean | "") {
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

  @Input() set disabledControl(disabled: string | boolean) {
    this.disabled = disabled;
  }

  @Input() set disabled(disabled: string | boolean) {
    if (disabled === '' || disabled === true) {
      this.formControl.disable({emitEvent: false});
    } else {
      this.formControl.enable({emitEvent: false});
    }
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

  selectedValue;

  selectedOptions = [];

  private subscription: Subscription;

  @ViewChild('inputEl', {static: true}) inputEl;

  @ViewChild('autocompleteTrigger', {static: true}) autocompleteTrigger: MatAutocompleteTrigger;

  constructor(_renderer: Renderer2,
              _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit() {
    if (this.options) {
      this.subscription = this.formControl.valueChanges.pipe(
        filter(value => value !== this.selectedValue),
        map(value => this.displayWith(value)),
        tap(() => {
          this.onChange(undefined);
          this.formControl.markAsTouched();
          this.formControl.markAsDirty();
          if (this.required || this.required === '') { this.formControl.setErrors({required: {value: undefined}}); }
          this.filteredOptions = [];
        })
      ).subscribe(value => {
        this.selectedValue = null;
        this.filteredOptions = this.options.filter(option =>
          this.displayWith(option).toLowerCase()
            .includes(this.displayWith(value).toLowerCase()));
        this.autocompleteTrigger.openPanel();
      });
    } else {
      this.subscription = this.formControl.valueChanges.pipe(
        delay(100),
        filter(value => value !== this.selectedValue),
        map(value => this.displayWith(value)),
        tap(() => {
          this.onChange(undefined);
          this.formControl.markAsTouched();
          this.formControl.markAsDirty();
          if (this.required || this.required === '') { this.formControl.setErrors({required: {value: undefined}}); }
          this.loading = true;
          this.filteredOptions = [];
        }),
        debounceTime(500),
        switchMap(value => this.filterBy(value)),
      ).subscribe(values => {
        this.selectedValue = null;
        this.loading = false;
        this.filteredOptions = values;
        this.autocompleteTrigger.openPanel();
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(event: MouseEvent) {
    event.stopPropagation();
    const value = this.inputEl.nativeElement.value;
    if (this.options) {
      this.filteredOptions = this.options.filter(option =>
        this.displayWith(option).toLowerCase().includes(this.displayWith(value).toLowerCase()));
      this.autocompleteTrigger.openPanel();
    } else {
      this.loading = true;
      this.filterBy(this.displayWith(value)).pipe(take(1)).subscribe(values => {
        this.loading = false;
        this.filteredOptions = values;
        this.autocompleteTrigger.openPanel();
      });
    }
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    if (this.multiple && !this.inputEl.nativeElement.value) {
      this.selectedOptions = [];
    }
    this.inputEl.nativeElement.value = '';
    this.formControl.setValue(undefined);
    this.onChange(undefined);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }

  writeValue(value) {
    if (this.multiple) {
      this.selectedOptions = value;
    } else {
      this.selectedValue = value;
      this.inputEl.nativeElement.value = this.displayWith(value);
    }
  }

  handleChange(event: MatAutocompleteSelectedEvent) {
    this.selectedValue = event.option.value;
    if (this._multiple) {
      this.inputEl.nativeElement.value = '';
      if (this.repeatable || !this.selectedOptions.some(o => event.option.viewValue === this.displayWith(o))) {
        this.selectedOptions.push(event.option.value);
        this.onChange(this.selectedOptions);
      }
    } else {
      this.inputEl.nativeElement.value = event.option.viewValue;
      this.onChange(event.option.value);
    }
  }

  removeSelected(selectedIndex: number) {
    this.selectedOptions.splice(selectedIndex, 1);
    this.onChange(this.selectedOptions);
  }

  editSelected(selectedIndex: number) {
    this.inputEl.nativeElement.value = this.displayWith(this.selectedOptions[selectedIndex]);
    this.selectedValue = null;
    this.removeSelected(selectedIndex);
  }
}
