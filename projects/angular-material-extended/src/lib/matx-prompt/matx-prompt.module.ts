import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatxPromptComponent } from './matx-prompt.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatxAutocompleteModule } from '../matx-autocomplete/matx-autocomplete.module';
import { MatxSelectModule } from '../matx-select/matx-select.module';
import { MatxInputModule } from '../matx-input/matx-input.module';
import { MatxErrorsModule } from '../matx-errors/matx-errors.module';
import { MatxDatepickerModule } from '../matx-datepicker/matx-datepicker.module';
import { MatxTextareaModule } from '../matx-textarea/matx-textarea.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatxErrorsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,
        MatxAutocompleteModule,
        MatButtonModule,
        MatxSelectModule,
        MatxInputModule,
        MatxDatepickerModule,
        MatProgressSpinnerModule,
        MatxTextareaModule
    ],
    declarations: [MatxPromptComponent],
    exports: [MatxPromptComponent]
})
export class MatxPromptModule {}
