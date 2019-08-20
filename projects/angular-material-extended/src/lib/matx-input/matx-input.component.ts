import { AfterContentInit, Component, ContentChild, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'matx-input, matx-input[ngModel], matx-input[formControl], matx-input[formControlName], matx-input[ngDefaultControl]',
  templateUrl: './matx-input.component.html',
  styleUrls: ['./matx-input.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxInputComponent), multi: true}]
})
export class MatxInputComponent extends DefaultValueAccessor implements AfterContentInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() pattern: string;

  @Input() type: 'text' | 'password' | 'tel' | 'number' | 'email' | 'search' | 'url' = 'text';

  @Input() min: string | number;

  @Input() max: string | number;

  @Input() minlength: string | number;

  @Input() maxlength: string | number;

  @Input() step: string | number;

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

  @ContentChild(NgControl,  {static: true}) ngControl: NgControl;

  formControl = new FormControl();

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngAfterContentInit() {
    this.formControl.valueChanges.subscribe(value => {
      if (this.type === 'number') {
        this.onChange(Number(value))
      } else {
        this.onChange(value);
      }
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
