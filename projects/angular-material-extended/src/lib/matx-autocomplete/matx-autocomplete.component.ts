import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { debounceTime, delay, filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'matx-autocomplete',
  templateUrl: './matx-autocomplete.component.html',
  styleUrls: ['./matx-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxAutocompleteComponent), multi: true}]
})
export class MatxAutocompleteComponent extends DefaultValueAccessor implements OnInit, OnDestroy {

  private initialValue;

  myControl = new FormControl();

  filteredOptions: any[] = [];

  @Input() required: boolean | '';

  @Input() placeholder: string;

  @Input() label: string;

  @Input() displayField: string;

  @Input() formLocation: string;

  @Input() filterBy: (filterVal: string) => Observable<any>;

  @Input() options: any[];

  @Input() displayWith = (option): string => !option ? '' : typeof option === 'string' ? option : option[this.displayField];

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
      this.subscription = this.myControl.valueChanges.pipe(
        filter(value => value !== this.selectedValue),
        map(value => this.displayWith(value))
      ).subscribe(value => {
        this.selectedValue = null;
        this.filteredOptions = this.options.filter(option => this.displayWith(option).toLowerCase().includes(value.toLowerCase()));
        this.autocompleteTrigger.openPanel();
      });
    } else {
      this.subscription = this.myControl.valueChanges.pipe(
        filter(value => value !== this.selectedValue),
        map(value => this.displayWith(value)),
        tap(() => {
          this.onChange(undefined);
          this.myControl.markAsTouched();
          this.myControl.markAsDirty();
          if (this.required || this.required === '') { this.myControl.setErrors({required: {value: undefined}}); }
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
      this.myControl.setValue(this.displayWith(this.initialValue), {emitEvent: !!this.initialValue});
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(event: MouseEvent) {
    event.stopPropagation();
    const value = this.myControl.value;
    if (this.options) {
      this.filteredOptions = this.options.filter(option => this.displayWith(option).toLowerCase().includes(value.toLowerCase()));
      this.autocompleteTrigger.openPanel();
    } else {
      this.loading = true;
      this.filterBy(value).pipe(take(1)).subscribe(values => {
        this.loading = false;
        this.filteredOptions = values;
        this.autocompleteTrigger.openPanel();
      });
    }
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.myControl.setValue(undefined);
    this.onChange(undefined);
    this.myControl.markAsTouched();
    this.myControl.markAsDirty();
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
