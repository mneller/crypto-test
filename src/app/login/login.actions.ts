import { Action } from '@ngrx/store';
import {User} from '../shared/auth.service';

export const TRY_LOGIN = '[Login] Try Login';
export const LOGIN_SUCCESSFUL = '[Login] Login Successful';
export const LOGIN_FAILS = '[Login] Login Fails';

export interface Authentication {
  username: string;
  password: string;
} // of interface Authentication.

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;

  constructor(public payload: Authentication) {};

} // of class TryLogin.

export class LoginSuccessful implements Action {
  readonly type = LOGIN_SUCCESSFUL;

  constructor(public payload: User) {};
} // of class LoginSuccesful.

export class LoginFails implements Action {
  readonly type = LOGIN_FAILS;

  constructor(public payload: string) {};
    // payload is the error message.
} // of class LoginFails.

export type Actions = TryLogin | LoginSuccessful | LoginFails;
