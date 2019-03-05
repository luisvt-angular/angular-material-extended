import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatxPromptAction, MatxPromptData } from './matx-prompt.models';


@Component({
  selector: 'matx-matx-prompt',
  templateUrl: './matx-prompt.component.html',
  styleUrls: ['./matx-prompt.component.scss']
})
export class MatxPromptComponent implements OnInit {

  result: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatxPromptData,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    for (const input of this.data.inputs) {
      this.result[input.name] = input.value;
    }
  }

  getActionText(action: MatxPromptAction) {
    return typeof action === 'string' ? action : action.text;
  }

  execActionCb(action: MatxPromptAction) {
    if (action.callback) {
      action.callback(this.result);
    }
    this.dialogRef.close();
  }
}
