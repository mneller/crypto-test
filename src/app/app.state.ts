import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import 'rxjs/add/operator/switchMap';

// ***************
// *** Action: ***
// ***************

export const SELECT_TAB = '[NAV] tab selected'
export enum Tabs {
  PageNotFound,
  Home,
  Login,
  Subscribe,
  User
}

export class SelectTab implements Action {
  readonly type = SELECT_TAB;

  constructor(public payload: Tabs) {};

}

export type Actions = SelectTab;

export interface State {
  nav: Tabs;
};

export const initialState: State = {
  nav: Tabs.Home
};


// ****************
// *** Reducer: ***
// ****************

export function appReducer(state: State, action: Actions): State {
  if(action.payload) {
    console.log('appReducer with payload: ' + action.payload.toString());
  }
  //let newState = {homeState: {...(state.homeState)}};
  // Comment: I had the problem that the changes of the hashValue were not triggere :-(
  // This because let newState = {...state} isn't triggering a new homeState object
  // This feature to understand costs me hours and is one of the most valuable learing f
  // from this excersise :-)

  switch (action.type) {
    case SELECT_TAB:
      return Object.assign({}, state, {nav: action.payload});
    default:
      return state;
  } // of switch (action.type).
} // appReducer(state: AppState, action: Action).

@Injectable()
export class StateEffects {

  // constructor(private actions: Actions, private store: Store<AppState>, private webCryptoService: WebCryptoService) {}
  //
  // @Effect() updateHashValue = this.actions.ofType('UPDATE_HASH_PARAMETER').
  //   switchMap(  (p: UpdateHashParameter) => {
  //   // console.log('EFFECT-UPDATE-HASH-PARAMETER: ' + JSON.stringify(p));
  //     const hashParam = p.payload.hashParameter;
  //     let result: Observable<string>;
  //     if (hashParam.hashAlgo === 'PBKDF2') {
  //       result = this.webCryptoService.pbkdf2Hash(
  //         hashParam.message,
  //         hashParam.saltText,
  //         hashParam.iterations,
  //         hashParam.bytes * 8
  //       );
  //     } else {
  //       result = this.webCryptoService.hashValue(hashParam.message);
  //     }
  //     return result.map((newHash: string) => ({type: 'NEW_HASH', payload: {hashValue: newHash}}));
  //   }); // of Effect() updateHashValue.

  // @Effect() navbarAction = this.actions.ofType(ROUTER_NAVIGATION).
  //   // subscribe((r: RouterNavigationAction) => {
  //   map((r: RouterNavigationAction) => {
  //     // console.log('NavAction: ' + JSON.stringify(r));
  //     console.log('NavAction - payload ' + JSON.stringify(r.payload.routerState));
  //     return null;
  // });

} // of class StateEffects.
