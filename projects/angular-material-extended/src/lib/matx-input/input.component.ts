import {Component, ElementRef, forwardRef, Input, OnInit, Renderer2} from '@angular/core';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

@Component({
  selector: 'matx-input, matx-input[ngModel], matx-input[formControl]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true}]
})
export class InputComponent extends DefaultValueAccessor implements OnInit {

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() name: string;

  @Input() pattern: string;

  value;

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit() {
  }


  writeValue(value: any): void {
    this.value = value;
    super.writeValue(value);
  }
}
