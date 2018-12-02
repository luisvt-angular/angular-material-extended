import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'matx-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {
  @Input() field: AbstractControl;

  get errorKeys() {
    return Object.keys(this.field.errors);
  }

  private _errorMessages = {
    'required': 'This field is required',
    'email': 'This field should have email format (user@service.com)',
    'min': (errors: ValidationErrors) => `This field should be greater than ${errors.min.required}`,
    'max': (errors: ValidationErrors) => `This field should be lower than ${errors.max.required}`,
    'minlength': (errors: ValidationErrors) => `This field cannot have less than ${errors.minlength.requiredLength} characters`,
    'maxlength': (errors: ValidationErrors) => `This field cannot have less than ${errors.maxlength.requiredLength} characters`,
    'pattern': (errors: ValidationErrors) => `This field does not match the pattern ${errors.pattern.requiredPattern}`
  };

  @Input()
  set errorMessages(value: {[key: string]: string | Function}) {
    this._errorMessages = Object.assign(this._errorMessages, value);
  }

  getErrorMessage(key: string, errors: ValidationErrors) {
    const errorMesage = this._errorMessages[key];
    if (typeof errorMesage === 'function') {
      return errorMesage(errors);
    } else {
      return errorMesage;
    }
  }
}
