import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-demo',
  templateUrl: './matx-autocomplete-demo.component.html'
})
export class MatxAutocompleteDemoComponent implements OnInit {

  disableAutocomplete0 = false;
  hideRequiredMarkerAutocomplete0 = false;
  floatLabel0: string;

  options0 = ['Alabama', 'Florida'];

  options1 = [
    {id: 1, name: 'Alabama'},
    {id: 2, name: 'Alabamas'},
    {id: 3, name: 'Florida'}
  ];

  form1Model = {
    autocompleteInput0: {id: 1, name: 'Alabama'},
    autocompleteInput1: 'Florida',
    autocompleteInput2: {name: 'Alabama'},
    autocompleteInput3: [{name: 'Florida'}],
    autocompleteInput4: ['Alabama'],
    autocompleteInput5: [{name: 'Alabama'}]
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      autocompleteInput1: 'Alabama',
      autocompleteInput2: {name: 'Florida'},
      autocompleteInput3: [['Florida'], Validators.minLength(2)],
      autocompleteInput4: [[{name: 'Alabama'}], Validators.minLength(2)]
    });
  }

  filterStringObservables(value: string) {
    // console.log('filterBy02 - value: ', value);
    return of(['Alabama', 'Florida'].filter(it => it.toLowerCase().includes(value.toLowerCase())))
      .pipe(delay(4000));
  }

  filterObjectObservables(value: string) {
    // console.log('filterBy02 - value: ', value);
    return of([{name: 'Alabama'}, {name: 'Florida'}].filter(it => it.name.toLowerCase().includes(value.toLowerCase())))
      .pipe(delay(4000));
  }

  checkForm1(form: NgForm) {
    console.log('checking...');
    console.log('form.invalid: ', form.invalid);
  }

  checkForm2() {
    console.log('checking...');
    console.log('this.form2.invalid: ', this.form2.invalid);
  }
}
