import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matx-select-demo',
  templateUrl: './matx-select-demo.component.html'
})
export class MatxSelectDemoComponent implements OnInit {

  model0 = 0;

  model1 = 'Option 2';

  model2: any;

  model3: string;

  model4: any;

  model5 = 1;

  stringOptions$ = of(['Option 1', 'Option 2']);

  objectOptions$ = of([{id: 1, name: 'Option 1'}, {id: 2, name: 'Option 2'}]);

  form1Model = {
    select1: 'Option 1',
    select2: {id: 2, name: 'Option 2'}
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form2 = this.fb.group({
      select1: 'Option 2',
      select2: {id: 2, name: 'Option 2'}
    });
  }

  compareById(o1, o2) {
    return o1.id === o2.id;
  }
}
