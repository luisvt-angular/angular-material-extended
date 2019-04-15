import {
  AfterContentInit,
  Component, ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { debounceTime, filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'matx-autocomplete',
  templateUrl: './matx-autocomplete.component.html',
  styleUrls: ['./matx-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxAutocompleteComponent), multi: true}]
})
export class MatxAutocompleteComponent extends DefaultValueAccessor implements OnInit, OnDestroy {

  private initialValue;

  formControl = new FormControl();

  filteredOptions: any[] = [];

  @ContentChild(NgControl) ngControl: NgControl;

  @Input() required: boolean | '';

  @Input() placeholder: string;

  @Input() label: string;

  @Input() displayField: string;

  @Input() filterBy: (filterVal: string) => Observable<any>;

  @Input() options: any[];

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

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

  private selectedValue;

  private subscription: Subscription;

  @ViewChild('autocompleteTrigger') autocompleteTrigger: MatAutocompleteTrigger;

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

    setTimeout(() => {
      this.formControl.setValue(this.displayWith(this.initialValue), {emitEvent: false});
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(event: MouseEvent) {
    event.stopPropagation();
    const value = this.formControl.value;
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
    this.formControl.setValue(undefined);
    this.onChange(undefined);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }

  writeValue(value) {
    this.initialValue = value;
    this.selectedValue = value;
  }

  handleChange(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.selectedValue = event.source.value;
      this.onChange(event.source.value);
    }
  }
}
