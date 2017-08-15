import {MyAction} from "../nav-actions";
import {HomeActions} from "./home-actions";

export interface HashParameter {
  hashAlgo: string;
  saltText: string;
  iterations: number;
  bytes: number;
  message: string;
};

export interface HomeState {
  hashParameter: HashParameter;
  hashValue: string;
}

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

export function homeReducer (lastState: HomeState = INIT_HOME_STATE, action: MyAction): HomeState {
//export function homeReducer (lastState: HomeState, action: MyAction): HomeState {
  console.log("homeReducer:lastState" + JSON.stringify(lastState));
  console.log("action:" + JSON.stringify(action));
  switch (action.type) {
    case HomeActions.UPDATE_HASH_PARAMETER:
      return Object.assign({}, lastState, {hashParameter: action.payload});
    case HomeActions.NEW_HASH:
      return Object.assign({}, lastState, {hashValue: action.payload});
    default:
      return lastState;
  } // of switch(action.type)
} // of function rootReducer.
