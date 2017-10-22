
import {EMPTY_USER, User} from '../shared/auth.service';
import * as LoginActions from './login.actions'
import {createFeatureSelector} from "@ngrx/store";

export interface LoginState {
  user: User;
  loginError: string;
} // of interface Login State.

export interface State {
  loginState: LoginState;
} // of interface State.

export const initialState:LoginState = {
  user: EMPTY_USER,
  loginError: ''
};

export function reducer(
  state: LoginState = initialState,
  action: LoginActions.Actions
): LoginState {
  const newState = {...state};
  switch (action.type) {
    case LoginActions.TRY_LOGIN:
      const user:User = {
        username: action.payload.username,
        password: action.payload.password,
        firstName: '',
        lastName: '',
        isLoggedIn: false
      };
      newState.user = user;
      return newState;
    case LoginActions.LOGIN_SUCCESSFUL:
      newState.user = action.payload;
      newState.loginError = '';
      return newState;
    case LoginActions.LOGIN_FAILS:
      newState.user = EMPTY_USER;
      newState.loginError = action.payload;
      return newState;
    default:
      return state;
  } // of switch (action.type).
} // of function reducer(...).

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
export const getLoginState = createFeatureSelector<LoginState>('login');



/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getUser = (state: State) => state.loginState.user;
export const getLoginError = (state: State) => state.loginState.loginError;
