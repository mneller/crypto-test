import { MyAction, NavActions } from './nav-actions';
import { HashParameter, homeReducer, HomeState, INIT_HOME_STATE } from "./home/home.reducer";
import { HomeActions} from "./home/home-actions";
import { combineReducers, compose } from "@ngrx/store";
import { INIT_NAV_STATE, navReducer, NavState } from "./home/nav.reducer";


export interface AppState {
  navState: NavState;
  homeState: HomeState;
};

export const INIT_STATE: AppState = {
  navState: INIT_NAV_STATE,
  homeState: INIT_HOME_STATE
};


export default compose(combineReducers)({
    navState: navReducer,
    homeState: homeReducer
}); // of compose(combineReducers).

/*
export function rootReducer (lastState: IAppState = INIT_STATE, action: MyAction): IAppState {
  switch (action.type) {
    case NavActions.SELECT_COMPONENT:
      console.log('SELECT COMPONENT: ' + JSON.stringify(action));
      console.log('lastState: ' + JSON.stringify(lastState));
      return Object.assign({}, lastState, {activeComponent: action.payload});
    case HomeActions.UPDATE_HASH_PARAMETER, HomeActions.NEW_HASH:
      console.log('homeState ===' + JSON.stringify(lastState.homeState));
      return Object.assign({}, lastState, homeReducer(lastState.homeState, action));
    default:
      return lastState;
  } // of switch(action.type)
} // of function rootReducer.
*/
