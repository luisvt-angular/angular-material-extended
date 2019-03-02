import { Component, OnInit } from '@angular/core';
import { MatxPromptController } from '../../../projects/angular-material-extended/src/public_api';

@Component({
  selector: 'app-matx-prompt-demo',
  templateUrl: './matx-prompt-demo.component.html'
})
export class MatxPromptDemoComponent implements OnInit {

  result;

  constructor(private promptCtrl: MatxPromptController) { }

  ngOnInit() {
  }

  showPrompt() {
    console.log('showing prompt');
    this.promptCtrl.prompt({
      title: 'Prompt Title',
      message: 'Prompt message',
      inputs: [
        {type: 'text', label: 'Text Input', name: 'textInput'},
        {type: 'select', label: 'Select Input', name: 'selectInput', options: ['Option 1', 'Option 2']},
        {
          type: 'autocomplete',
          label: 'Autocomplete Input',
          name: 'autocompleteInput',
          options: ['Option 1', 'Option 2']
        },
        {type: 'date', label: 'Date Input', name: 'dateInput'}
      ],
      actions: [
        'Close',
        {
          text: 'Save',
          color: 'primary',
          callback: (result) => {
            this.result = result;
          }
        }
      ]
    });
  }
}
