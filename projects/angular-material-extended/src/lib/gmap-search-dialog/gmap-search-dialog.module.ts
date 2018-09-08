import { NgModule } from '@angular/core';
import { GmapSearchDialogComponent } from './gmap-search-dialog.component';
import { MatButtonModule, MatExpansionModule, MatIconModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    FormsModule,
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [GmapSearchDialogComponent],
  entryComponents: [GmapSearchDialogComponent],
  exports: [GmapSearchDialogComponent]
})
export class GmapSearchDialogModule {
}
