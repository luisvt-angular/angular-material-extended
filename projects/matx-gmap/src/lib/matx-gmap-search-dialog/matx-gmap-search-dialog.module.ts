import { NgModule } from '@angular/core';
import { MatxGmapSearchDialogComponent } from './matx-gmap-search-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
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
    declarations: [MatxGmapSearchDialogComponent],
    exports: [MatxGmapSearchDialogComponent]
})
export class MatxGmapSearchDialogModule {
}
