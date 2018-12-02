import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form1Model = {
    input1: 'test1',
    matxInput1: 'test1',
    numberInput1: 1,
    gmapInput1: {address: 'test1'}
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      input2: 'test2',
      matxInput2: 'test2',
      numberInput2: 1,
      gmapInput2: {address: 'test2'}
    });
  }
}
