/**
 * Created by eller on 01.07.17.
 */
import { Action } from '@ngrx/store';

export interface MyAction extends Action {
  payload?: any;
}

export class NavActions {
  static SELECT_COMPONENT = 'SELECT_COMPONENT';

  static selectComponent(compnentName: string): MyAction {
    return { type: this.SELECT_COMPONENT, payload: compnentName};
  } // of static selectHome().

} // of class NavActions
