import {
  AfterContentInit,
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
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'matx-select',
  templateUrl: './matx-select.component.html',
  styleUrls: ['./matx-select.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxSelectComponent), multi: true}]
})
export class MatxSelectComponent extends DefaultValueAccessor implements OnInit, AfterContentInit, OnDestroy {

  @Input() options: any[] | Observable<any[]>;

  _options: any[];

  @Input() label: string;

  @Input() placeholder: string;

  @Input() required: boolean | '';

  @Input() displayField: string;

  @Input() noneText: string;

  @ContentChild(NgControl) ngControl: NgControl;

  control = new FormControl();

  subscription: Subscription;

  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit(): void {
    this.displayWith = this.displayWith || ((option) =>
      typeof option === 'string' ? option : option[this.displayField]);
  }

  ngAfterContentInit() {
    this.subscription = this.control.valueChanges.subscribe(value => this.onChange(value));
    if (this.ngControl && this.ngControl.statusChanges) {
      this.subscription.add(this.ngControl.control.statusChanges.subscribe(() => {
        this.control.setErrors(this.ngControl.errors);
      }));
    }
    if (this.options instanceof Observable) {
      this.subscription.add(this.options.subscribe(options => this._options = options));
    } else {
      this._options = this.options;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.control.setValue(value);
    super.writeValue(value);
  }

  @Input()
  displayWith;
}
