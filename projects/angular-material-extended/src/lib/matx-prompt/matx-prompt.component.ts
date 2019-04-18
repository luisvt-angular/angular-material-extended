import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatxPromptAction, MatxPromptData } from './matx-prompt.models';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'matx-matx-prompt',
  templateUrl: './matx-prompt.component.html',
  styleUrls: ['./matx-prompt.component.scss']
})
export class MatxPromptComponent implements OnInit {

  form = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatxPromptData,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    for (const input of this.data.inputs || []) {
      this.form.addControl(input.name, new FormControl(input.value, input.validators));
    }
  }

  getActionText(action: MatxPromptAction) {
    return typeof action === 'string' ? action : action.text;
  }

  async execActionCb(action: MatxPromptAction) {
    if (action.callback) {
      try {
        if (this.form.invalid) { return; }
        if (action.showLoading) action._loading = true;
        await action.callback(this.form.value);
        this.dialogRef.close();
        if (action.showLoading) action._loading = false;
      } catch (e) {
        if (action.showLoading) action._loading = false;
        throw e;
      }
    } else {
      this.dialogRef.close();
    }
  }
}
