import {RouterAction} from "@ngrx/router-store";
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {WebCryptoService} from "./web-crypto.service";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";

// **************
// *** State: ***
// **************

export type HashParameter = { hashAlgo: string, saltText: string, iterations: number, bytes: number, message: string };
export type HomeState = { hashParameter: HashParameter, hashValue: string };

export type AppState = { homeState: HomeState};
export type State = { app: AppState};


export const INIT_HOME_STATE: HomeState = {
  hashParameter: {
    hashAlgo: 'PBKDF2',
    saltText: 'hugo',
    iterations: 1000,
    bytes: 256 / 8,
    message: ''
  },
  hashValue: 'tbd'
};

export const initialState: State = {
  app: {
    homeState: INIT_HOME_STATE
  }
};

// ****************
// *** Actions: ***
// ****************
export type UpdateHashParameter = {type: 'UPDATE_HASH_PARAMETER', payload: {hashParameter: HashParameter}};
export type NewHash = {type: 'NEW_HASH', payload: {hashValue: string}};

type Action = RouterAction<State> | UpdateHashParameter | NewHash;

// ****************
// *** Reducer: ***
// ****************

export function appReducer(state: AppState, action: Action): AppState {
  // console.log('appReducer with action.type: ' + action.type);
  // console.log('appReducer with state: ' + JSON.stringify(state));
  if(action.payload) {
    console.log('appReducer with payload: ' + action.payload.toString());
  }
  let newState = {homeState: {...(state.homeState)}};
  // Comment: I had the problem that the changes of the hashValue were not triggere :-(
  // This because let newState = {...state} isn't triggering a new homeState object
  // This feature to understand costs me hours and is one of the most valuable learing f
  // from this excersise :-)

  switch (action.type) {
    case 'UPDATE_HASH_PARAMETER':
      newState.homeState.hashParameter = action.payload.hashParameter;
      return newState;
    case 'NEW_HASH':
      console.log('newHash');
      newState.homeState.hashValue = action.payload.hashValue;
      return newState;
    default:
      return state;
  } // of switch (action.type).
} // appReducer(state: AppState, action: Action).

@Injectable()
export class StateEffects {

  constructor(private actions: Actions, private store: Store<AppState>, private webCryptoService: WebCryptoService) {}

  @Effect() updateHashValue = this.actions.ofType('UPDATE_HASH_PARAMETER').
    switchMap(  (p: UpdateHashParameter) => {
    // console.log('EFFECT-UPDATE-HASH-PARAMETER: ' + JSON.stringify(p));
      const hashParam = p.payload.hashParameter;
      let result: Observable<string>;
      if (hashParam.hashAlgo === 'PBKDF2') {
        result = this.webCryptoService.pbkdf2Hash(
          hashParam.message,
          hashParam.saltText,
          hashParam.iterations,
          hashParam.bytes * 8
        );
      } else {
        result = this.webCryptoService.hashValue(hashParam.message);
      }
      return result.map((newHash: string) => ({type: 'NEW_HASH', payload: {hashValue: newHash}}));
    }); // of Effect() updateHashValue.

} // of class StateEffects.
