import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { ValidatorsModule } from 'ngx-validators';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxModule, MatxPromptComponent } from 'angular-material-extended';
import { MatxGmapModule } from "angular-material-extended/matx-gmap";
import { MatxAutocompleteDemoComponent } from './matx-autocomplete-demo/matx-autocomplete-demo.component';
import { MatxInputDemoComponent } from './matx-input-demo/matx-input-demo.component';
import { MatxGmapAutocompleteDemoComponent } from './matx-gmap-autocomplete-demo/matx-gmap-autocomplete-demo.component';
import { RouterModule, Routes } from '@angular/router';
import { HighlightModule } from 'ngx-highlightjs';
import { MatxBackButtonDemoComponent } from './matx-back-button-demo/matx-back-button-demo.component';
import { MatxMenuButtonDemoComponent } from './matx-menu-button-demo/matx-menu-button-demo.component';
import { MatxPromptDemoComponent } from './matx-prompt-demo/matx-prompt-demo.component';
import { MatxSelectDemoComponent } from './matx-select-demo/matx-select-demo.component';
import { MatxDatepickerDemoComponent } from './matx-datepicker-demo/matx-datepicker-demo.component';
import { MatxNavTreeDemoComponent } from './matx-nav-tree-demo/matx-nav-tree-demo.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/matx-input'},
  {path: 'matx-input', component: MatxInputDemoComponent},
  {path: 'matx-datepicker', component: MatxDatepickerDemoComponent},
  {path: 'matx-autocomplete', component: MatxAutocompleteDemoComponent},
  {path: 'matx-gmap-autocomplete', component: MatxGmapAutocompleteDemoComponent},
  {path: 'matx-back-button', component: MatxBackButtonDemoComponent},
  {path: 'matx-menu-button', component: MatxMenuButtonDemoComponent},
  {path: 'matx-select', component: MatxSelectDemoComponent},
  {path: 'matx-prompt', component: MatxPromptDemoComponent},
  {path: 'matx-nav-tree', component: MatxNavTreeDemoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MatxAutocompleteDemoComponent,
    MatxInputDemoComponent,
    MatxGmapAutocompleteDemoComponent,
    MatxBackButtonDemoComponent,
    MatxMenuButtonDemoComponent,
    MatxPromptDemoComponent,
    MatxSelectDemoComponent,
    MatxDatepickerDemoComponent,
    MatxNavTreeDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HighlightModule,
    MatxModule,
    MatxGmapModule,
    ValidatorsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_key,
      libraries: ['places']
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatxPromptComponent]
})
export class AppModule {}
