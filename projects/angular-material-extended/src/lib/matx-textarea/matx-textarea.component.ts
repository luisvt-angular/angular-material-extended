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
import { isEmptyOrTrue } from '../utils/is-empty-or-true';

@Component({
  selector: 'matx-textarea',
  templateUrl: './matx-textarea.component.html',
  styleUrls: ['./matx-textarea.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxTextareaComponent), multi: true}]
})
export class MatxTextareaComponent extends DefaultValueAccessor implements AfterContentInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '' | null;

  @Input() pattern: string;

  @Input() minlength: string | number;

  @Input() maxlength: string | number;

  @Input() hideRequiredMarker: boolean | '';

  @Input() floatLabel: 'auto' | 'always' | 'never';

  @Input() rows: string | number;

  @Input() set disabledControl(disabled: string | boolean) {
    this.disabled = disabled;
  }

  @Input() set disabled(disabled: string | boolean) {
    if (isEmptyOrTrue(disabled)) {
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
    this.formControl.valueChanges.subscribe(value => this.onChange(value));
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
