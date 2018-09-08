import { Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'matx-input, matx-input[ngModel], matx-input[formControl], matx-input[formControlName], matx-input[ngDefaultControl]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true}]
})
export class InputComponent extends DefaultValueAccessor {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() pattern: string;

  value;

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  writeValue(value: any): void {
    this.value = value;
    super.writeValue(value);
  }
}
