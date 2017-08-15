import {MyAction, NavActions} from "../nav-actions";

export interface NavState {
  activeComponent: string;
}

export const INIT_NAV_STATE: NavState = {
  activeComponent: 'Home'
};

export function navReducer (lastState: NavState = INIT_NAV_STATE, action: MyAction): NavState {
  switch (action.type) {
    case NavActions.SELECT_COMPONENT:
      console.log('SELECT COMPONENT: ' + JSON.stringify(action));
      console.log('lastState: ' + JSON.stringify(lastState));
      return Object.assign({}, lastState, {activeComponent: action.payload});
    default:
      return lastState;
  } // of switch(action.type)
} // of function navReducer.
