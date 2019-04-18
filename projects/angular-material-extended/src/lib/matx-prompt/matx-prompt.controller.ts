import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatxPromptComponent } from './matx-prompt.component';
import { MatxPromptConfig } from './matx-prompt.models';

@Injectable({
  providedIn: 'root'
})
export class MatxPromptController {

  constructor(private dialog: MatDialog) { }

  prompt(config: MatxPromptConfig) {
    this.dialog.open(MatxPromptComponent, {
      role: config.role,
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop || true,
      backdropClass: config.backdropClass,
      disableClose: config.disableClose || false,
      width: config.width,
      height: config.height,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      position: config.position,
      direction: config.direction,
      ariaDescribedBy: config.ariaDescribedBy,
      ariaLabel: config.ariaLabel,
      autoFocus: config.autoFocus,
      restoreFocus: config.restoreFocus,
      scrollStrategy: config.scrollStrategy,
      closeOnNavigation: config.closeOnNavigation,
      data: {
        title: config.title,
        message: config.message,
        inputs: config.inputs,
        actions: config.actions
      }
    })
  }
}
