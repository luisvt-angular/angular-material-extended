import { DialogPosition, DialogRole } from '@angular/material';
import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { ValidatorFn, Validators } from '@angular/forms';

export interface MatxPromptConfig extends MatxPromptData {
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;
  /** The ARIA role of the dialog element. */
  role?: DialogRole;
  /** Custom class for the overlay pane. */
  panelClass?: string | string[];
  /** Width of the dialog. */
  width?: string;
  /** Height of the dialog. */
  height?: string;
  /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
  maxWidth?: number | string;
  /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
  /** Position overrides. */
  position?: DialogPosition;
  /** Layout direction for the dialog's content. */
  direction?: Direction;
  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null;
  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null;
  /** Whether the dialog should focus the first focusable element on open. */
  autoFocus?: boolean;
  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean;
  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;
  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean;
}

export interface MatxPromptData {
  /** Title of the Dialog */
  title?: string;
  /** Message of the Dialog */
  message?: string;
  /** List of inputs of the Dialog */
  inputs?: MatxPromptInput[];
  /** List of actions of the Dialog */
  actions?: Array<string | MatxPromptAction>;
}

export interface MatxPromptInput {
  type: 'text' | 'number' | 'select' | 'autocomplete' | 'date';
  label?: string;
  placeholder?: string;
  name: string;
  value?;
  required?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
  errorMessages?: {[name: string]: string | Function};
  options?: string[] | any[] | Observable<[]>;
  noneText?: string;
  displayField?: string;
  displayWith?: (option) => string;
  filterBy?: (value: string) => Observable<any[]>;
}

export interface MatxPromptAction {
  text: string;
  type?: 'button' | 'submit';
  callback: (result) => any | Promise<any>;
  color?: string;
  showLoading?: boolean;
  _loading?: boolean;
}
