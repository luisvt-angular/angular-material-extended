import { Component, Input } from '@angular/core';
import { AbstractControl, NgModel, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'matx-errors',
  templateUrl: './matx-errors.component.html',
  styleUrls: ['./matx-errors.component.css']
})
export class MatxErrorsComponent {
  @Input() field: AbstractControl | NgModel;

  get errorKeys() {
    return this.field.errors ? Object.keys(this.field.errors) : [];
  }

  private _errorMessages = {
    required: 'This field is required',
    email: 'This field should have email format (user@service.com)',
    min: (errors: ValidationErrors) => `This field should be equal or greater than ${errors.min.required}`,
    max: (errors: ValidationErrors) => `This field should be equal or lower than ${errors.max.required}`,
    minlength: (errors: ValidationErrors) => `This field should have at least ${errors.minlength.requiredLength} characters`,
    maxlength: (errors: ValidationErrors) => `This field cannot have more than ${errors.maxlength.requiredLength} characters`,
    pattern: (errors: ValidationErrors) => `This field does not match the pattern ${errors.pattern.requiredPattern}`
  };

  @Input()
  set errorMessages(value: {[key: string]: string | ((errors?: ValidationErrors) => string)}) {
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
