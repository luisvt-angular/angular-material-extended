import { Component, OnInit } from '@angular/core';
import { MatxPromptController } from 'angular-material-extended';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
          label: 'Autocomplete Input 1',
          name: 'autocompleteInput1',
          value: 'Option 1',
          options: ['Option 1', 'Option 2']
        },
        {
          type: 'autocomplete',
          label: 'Autocomplete Input 2',
          name: 'autocompleteInput2',
          value: {name: 'Option 2'},
          displayField: 'name',
          filterBy: value =>
            of([{name: 'Option 1'}, {name: 'Option 2'}].filter(it => it.name.toLowerCase().includes(value.toLowerCase())))
              .pipe(delay(3000))
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
