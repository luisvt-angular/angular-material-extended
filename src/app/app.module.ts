import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularMaterialExtendedModule } from '../../projects/angular-material-extended/src/public_api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { ValidatorsModule } from 'ngx-validators';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialExtendedModule,
    ValidatorsModule,
    MatFormFieldModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_key,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
