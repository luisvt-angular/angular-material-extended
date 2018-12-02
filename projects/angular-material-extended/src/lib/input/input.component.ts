import { AfterContentInit, Component, ContentChild, ElementRef, forwardRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'matx-input, matx-input[ngModel], matx-input[formControl], matx-input[formControlName], matx-input[ngDefaultControl]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true}]
})
export class InputComponent extends DefaultValueAccessor implements AfterContentInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() pattern: string;

  @ContentChild(NgControl) ngControl: NgControl;

  control = new FormControl();

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngAfterContentInit() {
    this.control.valueChanges.subscribe(value => this.onChange(value));
    if (this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.control.statusChanges.subscribe(() => {
        this.control.setErrors(this.ngControl.errors);
      });
    }
  }

  writeValue(value: any): void {
    this.control.setValue(value);
    super.writeValue(value);
  }
}
