import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({providedIn: 'root'})
export class MatxSidenavMenuController {

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.isMobile = result.matches;
      this.opened = !this.isMobile;
    });
  }

  opened = false;

  isMobile = false;

}
