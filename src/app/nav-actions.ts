/**
 * Created by eller on 01.07.17.
 */
import { Action } from 'redux';
// TODO: Enum of components?
export class NavActions {
  static SELECT_HOME = 'SELECT_HOME';
  static SELECT_SUBSCRIBE = 'SELECT_SUBSCRIBE';
  static SELECT_LOGIN = 'SELECT_LOGIN';

  static selectHome(): Action {
    return { type: this.SELECT_HOME}
  } // of static selectHome().

  static selectSUBSCRIBE(): Action {
    return { type: this.SELECT_SUBSCRIBE}
  } // of static selectHome().

  static selectLogin(): Action {
    return { type: this.SELECT_LOGIN}
  } // of static selectHome().

} // of class NavActions
