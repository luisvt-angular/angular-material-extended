import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-demo',
  templateUrl: './matx-autocomplete-demo.component.html'
})
export class MatxAutocompleteDemoComponent implements OnInit {

  form1Model = {
    autocompleteInput1: 'Florida'
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      autocompleteInput2: 'Alabama'
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
}
