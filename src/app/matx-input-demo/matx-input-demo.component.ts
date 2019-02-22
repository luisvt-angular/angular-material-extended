import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matx-input-demo',
  templateUrl: './matx-input-demo.component.html'
})
export class MatxInputDemoComponent implements OnInit {

  form1Model = {
    input1: 'test1',
    matxInput1: 'test1',
    numberInput1: 1
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      input2: 'test2',
      matxInput2: 'test2',
      numberInput2: 1
    });
  }

}
