import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matx-gmap-autocomplete',
  templateUrl: './matx-gmap-autocomplete-demo.component.html'
})
export class MatxGmapAutocompleteDemoComponent implements OnInit {

  form1Model = {
    gmapInput1: {address: 'test1'}
  };

  form2: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form2 = this.fb.group({
      gmapInput2: {address: 'test2'}
    });
  }

}
