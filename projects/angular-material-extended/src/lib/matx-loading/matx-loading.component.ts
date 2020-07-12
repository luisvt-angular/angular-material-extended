import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatxLoadingData } from './matx-loading.models';

@Component({
  selector: 'matx-loading',
  templateUrl: './matx-loading.component.html',
  styleUrls: ['./matx-loading.component.scss']
})
export class MatxLoadingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatxLoadingData,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }

}
