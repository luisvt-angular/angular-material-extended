import { Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'matx-select',
  templateUrl: './matx-select.component.html',
  styleUrls: ['./matx-select.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxSelectComponent), multi: true}]
})
export class MatxSelectComponent extends DefaultValueAccessor implements OnInit, OnDestroy {

  @Input() options: any[] | Observable<any[]>;

  options$ = new BehaviorSubject([]);

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() displayField: string;

  @Input() compareField: string;

  @Input() noneText: string;

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

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

  _displayWith: Function;

  get displayWith(): Function {
    return option =>
      !option ? ''
        : (typeof option === 'string' || typeof option === 'number') ? option
        : this._displayWith ? this._displayWith(option)
          : option[this.displayField];
  }

  @Input()
  set displayWith(displayWith: Function) {
    this._displayWith = displayWith;
  }

  @Input() compareWith;

  _compareWith = (o1, o2) => {
    return o1 && o2 && (o1 === o2
      || this.compareWith && this.compareWith(o1, o2)
      || this.compareField && o1[this.compareField] === o2[this.compareField]
      || this.displayField && o1[this.displayField] === o2[this.displayField]);
  };

  @Input() multiple: boolean | '';

  @ContentChild(NgControl) ngControl: NgControl;

  formControl = new FormControl();

  private subscription: Subscription;

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit() {
    this.subscription = this.formControl.valueChanges.subscribe(value => this.onChange(value));
    if (this.ngControl && this.ngControl.statusChanges) {
      this.subscription.add(this.ngControl.control.statusChanges.subscribe(() => {
        this.formControl.setErrors(this.ngControl.errors);
      }));
    }
    if (this.options instanceof BehaviorSubject) {
      this.options$ = this.options;
    } else if (this.options instanceof Observable) {
      this.subscription.add(this.options.subscribe(this.options$));
    } else {
      this.options$.next(this.options);
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.formControl.setValue(value, {emitEvent: false});
  }

}
