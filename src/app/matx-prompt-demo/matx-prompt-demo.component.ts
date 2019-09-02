import { Component, OnInit } from '@angular/core';
import { MatxPromptController } from 'angular-material-extended';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-matx-prompt-demo',
  templateUrl: './matx-prompt-demo.component.html'
})
export class MatxPromptDemoComponent implements OnInit {

  mainModuleCode = `
@NgModule({
  ...
  entryComponents: [
    ...
    MatxPromptComponent
    ...
  ]
})
export class AppModule {}`;

  result: any = {};

  constructor(private promptCtrl: MatxPromptController) { }

  ngOnInit() {
  }

  showPrompt() {
    console.log('showing prompt');
    this.promptCtrl.prompt({
      title: 'Prompt Title',
      message: 'Prompt message',
      inputs: [{
        type: 'text',
        label: 'Text Input',
        name: 'textInput',
        value: this.result.textInput,
        required: true,
        validators: Validators.pattern(/^[A-Za-z]*$/),
        errorMessages: {
          pattern: 'This field only accepts letters'
        }
      }, {
        type: 'select',
        label: 'Select Input 1',
        name: 'selectInput1',
        options: ['Option 1', 'Option 2'],
        required: true
      }, {
        type: 'select',
        label: 'Select Input 2',
        name: 'selectInput2',
        options: ['Option 1', 'Option 2'],
        value: 'Option 1',
        multiple: true,
        required: true,
        validators: [Validators.minLength(2)],
        errorMessages: {minlength: 'This field requires at least 2 items'}
      }, {
        type: 'autocomplete',
        label: 'Autocomplete Input 1',
        name: 'autocompleteInput1',
        value: 'Option 1',
        options: ['Option 1', 'Option 2'],
        required: true
      }, {
        type: 'autocomplete',
        label: 'Autocomplete Input 2',
        name: 'autocompleteInput2',
        value: {name: 'Option 2'},
        displayField: 'name',
        filterBy: () => value =>
          of([{name: 'Option 1'}, {name: 'Option 2'}].filter(it => it.name.toLowerCase().includes(value.toLowerCase())))
            .pipe(delay(3000))
      }, {
        type: 'autocomplete',
        label: 'Autocomplete Input 3',
        name: 'autocompleteInput3',
        value: [{name: 'Option 1'}],
        displayField: 'name',
        multiple: true,
        required: true,
        filterBy: () => value =>
          of([{name: 'Option 1'}, {name: 'Option 2'}].filter(it => it.name.toLowerCase().includes(value.toLowerCase())))
            .pipe(delay(3000)),
        validators: [Validators.minLength(2)],
        errorMessages: {minlength: 'This field requires at least 2 items'}
      }, {type: 'date', label: 'Date Input', name: 'dateInput'}
      ],
      actions: [
        'Close',
        {
          text: 'Save',
          color: 'primary',
          type: 'submit',
          showLoading: true,
          callback: (result) => {
            this.result = result;
            return new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
      ]
    });
  }
}
