import * as homeActions from './home.actions';
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {HashAlgo} from "../web-crypto.service";


export type HomeState = { hashParameter: homeActions.HashParameter , hashValue: string };

export interface State {
  homeState: HomeState;
}


export const initialState: HomeState = {
  hashParameter: {
    hashAlgo: HashAlgo.pbkdf2,
    saltText: 'hugo',
    iterations: 1000,
    bytes: 256 / 8,
    message: ''
  },
  hashValue: 'tbd'
};

export function reducer(
  state:HomeState = initialState,
  action: homeActions.Actions
): HomeState {
  console.log('home.reducer: Action.type ==> ' + action.type);
  let newState = {...state};
  switch (action.type) {
    case homeActions.UPDATE_HASH_PARAMETER:
      newState.hashParameter = action.payload;
      return newState;
    case homeActions.HASH_UPDATED:
      console.log('newHash: ' + action.payload);
      newState.hashValue = action.payload;
      return newState;
    default: {
      return state;
    }
  }
}

// export const reducers = {
//   home: reducer
// };

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getHomeState = createFeatureSelector<HomeState>('home');



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
