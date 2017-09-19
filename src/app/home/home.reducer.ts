import * as homeActions from './home.actions';
import * as appState from '../app.state'

export type HomeState = { hashParameter: homeActions.HashParameter , hashValue: string };


export interface State extends appState.State {
  homeState: HomeState;
}

export const initialState: State = {
  nav: appState.initialState.nav,
  homeState: {
    hashParameter: {
      hashAlgo: 'PBKDF2',
      saltText: 'hugo',
      iterations: 1000,
      bytes: 256 / 8,
      message: ''
    },
    hashValue: 'tbd'
  }
};

export function reducer(
  state:State = initialState,
  action: homeActions.Actions
): State {
  let newState = {...state};
  newState.homeState = {...(state.homeState)};
  switch (action.type) {
    case homeActions.UPDATE_HASH_PARAMETER:
      newState.homeState.hashParameter = action.payload;
      return newState;
    case homeActions.HASH_UPDATED:
      // console.log('newHash');
      newState.homeState.hashValue = action.payload;
      return newState;
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getHashValue = (state: State) => state.homeState.hashValue;
export const getHashParameter = (state: State) => state.homeState.hashParameter;
