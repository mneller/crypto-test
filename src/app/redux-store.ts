import { MyAction, NavActions } from './nav-actions';

export interface IAppState {
  activeComponent: string;
}

export const INIT_STATE: IAppState = {
  activeComponent: 'Home',
};

export function rootReducer (lastState: IAppState, action: MyAction): IAppState {
  switch (action.type) {
    case NavActions.SELECT_COMPONENT:
      console.log('SELECT COMPONENT: ' + JSON.stringify(action));
      return Object.assign({}, lastState, {activeComponent: action.payload});
    default:
      return lastState;
  } // of switch(action.type)
} // of function rootReducer.
