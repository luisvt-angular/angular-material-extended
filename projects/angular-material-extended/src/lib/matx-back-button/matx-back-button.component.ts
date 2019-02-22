import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'matx-back-button',
  templateUrl: './matx-back-button.component.html'
})
export class MatxBackButtonComponent {

  constructor(public location: Location) { }

}
