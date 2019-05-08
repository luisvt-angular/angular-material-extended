import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matx-input-demo',
  templateUrl: './matx-datepicker-demo.component.html'
})
export class MatxDatepickerDemoComponent implements OnInit {

  form1Model = {
    matxDatepicker1: null,
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      matxDatepicker2: null,
    });
  }

}
