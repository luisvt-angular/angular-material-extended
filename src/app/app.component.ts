import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form1Model = {
    input1: 'test1'
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      input2: 'test2'
    });
  }
}
