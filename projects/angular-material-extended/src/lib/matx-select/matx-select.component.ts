import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'matx-select',
  templateUrl: './matx-select.component.html',
  styleUrls: ['./matx-select.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxSelectComponent), multi: true}]
})
export class MatxSelectComponent extends DefaultValueAccessor implements OnInit, AfterViewInit, OnDestroy {

  @Input() set disabledControl(disabled: string | boolean) {
    this.disabled = disabled;
  }

  @Input() set disabled(disabled: string | boolean) {
    if (coerceBooleanProperty(disabled)) {
      this.formControl.disable({emitEvent: false});
    } else {
      this.formControl.enable({emitEvent: false});
    }
  }

  _displayWith: (option?: any) => void;

  get displayWith(): (option?: any) => void {
    return option =>
      !option ? ''
        : this._displayWith ? this._displayWith(option)
        : (typeof option === 'string' || typeof option === 'number') ? option
          : option[this.displayField];
  }

  @Input()
  set displayWith(displayWith: (option?: any) => void) {
    this._displayWith = displayWith;
  }

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  @Input() options: any[] | Observable<any[]>;

  options$: any = new BehaviorSubject([]);

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() displayField: string;

  @Input() compareField: string;

  @Input() valueField: string;

  @Input() indexValue: boolean | '' | null;

  @Input() noneText: string;

  @Input() hideRequiredMarker: boolean;

  @Input() floatLabel: 'auto' | 'always' | 'never';

  @Input() compareWith;

  @Input() multiple: boolean | '';

  @ContentChild(NgControl, {static: true}) ngControl: NgControl;

  formControl = new FormControl();

  private subscription: Subscription;

  _compareWith = (option, value) => {
    return option !== null && option !== undefined && value !== null && value !== undefined
      && (option === value
        || this.compareWith && this.compareWith(option, value)
        || (typeof option === 'object'
          && (this.compareField
            && (typeof value === 'string' || typeof value === 'number'
              ? option[this.compareField] === value
              : option[this.compareField] === value[this.compareField])
            || this.displayField && option[this.displayField] === value[this.displayField])));
  }

  ngOnInit() {
    this.subscription = this.formControl.valueChanges.subscribe(value => this.onChange(value));
    if (this.options instanceof BehaviorSubject) {
      this.options$ = this.options;
    } else if (this.options instanceof Observable) {
      this.subscription.add(this.options.subscribe(options => this.options$.next(options)));
    } else {
      this.options$.next(this.options);
    }
  }

  ngAfterViewInit(): void {
    if (this.ngControl && this.ngControl.statusChanges) {
      this.subscription.add(this.ngControl.control.statusChanges
        .subscribe(() => this.formControl.setErrors(this.ngControl.errors)));
      setTimeout(() => this.ngControl.control.setValue(this.formControl.value, {emitEvent: false}));
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  writeValue(value: any): void {
    this.formControl.setValue(!this.multiple || value === null || value === undefined || Array.isArray(value) ? value : [value]);
  }

}
