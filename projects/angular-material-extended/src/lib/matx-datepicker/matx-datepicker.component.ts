import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'matx-datepicker, matx-datepicker[ngModel], matx-datepicker[formControl], matx-datepicker[formControlName], matx-datepicker[ngDefaultControl]',
  templateUrl: './matx-datepicker.component.html',
  styleUrls: ['./matx-datepicker.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxDatepickerComponent), multi: true}]
})
export class MatxDatepickerComponent extends DefaultValueAccessor implements AfterContentInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() min: string;

  @Input() max: string;

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

  @Input() autocomplete = 'off';

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

  @ContentChild(NgControl,  {static: true}) ngControl: NgControl;

  formControl = new FormControl();

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngAfterContentInit() {
    this.formControl.valueChanges.subscribe(value => {
        this.onChange(value);
    });
    if (this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.control.statusChanges.subscribe(() => {
        this.formControl.setErrors(this.ngControl.errors);
      });
    }
  }

  writeValue(value: any): void {
    this.formControl.setValue(value, {emitEvent: false});
  }
}
