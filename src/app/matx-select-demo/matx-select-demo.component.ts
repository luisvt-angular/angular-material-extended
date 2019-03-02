import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matx-select-demo',
  templateUrl: './matx-select-demo.component.html'
})
export class MatxSelectDemoComponent implements OnInit {

  model1: string;

  model2: any;

  model3: string;

  model4: any;

  stringOptions$ = of(['Option 1', 'Option 2']);

  objectOptions$ = of([{name: 'Option 1'}, {name: 'Option 2'}]);

  form1Model = {
    model1: 'Option 1'
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form2 = this.fb.group({
      model1: 'Option 2'
    });
  }

}
