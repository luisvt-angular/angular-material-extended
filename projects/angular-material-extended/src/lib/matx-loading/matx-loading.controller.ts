import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatxLoadingConfig } from './matx-loading.models';
import { MatxLoadingComponent } from './matx-loading.component';

@Injectable({
  providedIn: 'root'
})
export class MatxLoadingController {
  constructor(private dialog: MatDialog) {}

  show(config: MatxLoadingConfig) {
    this.dialog.open(MatxLoadingComponent, {
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
      }
    })
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
