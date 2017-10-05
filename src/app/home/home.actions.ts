import { Action } from '@ngrx/store';
import {HashAlgo} from "../web-crypto.service";

export type HashParameter = { hashAlgo: HashAlgo, saltText: string, iterations: number, bytes: number, message: string };
export const UPDATE_HASH_PARAMETER = '[HOME] Update HashParameter';
export const HASH_UPDATED = '[HOME] Hash updated';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class UpdateHashParameter implements Action {
  readonly type = UPDATE_HASH_PARAMETER;

  constructor(public payload: HashParameter) {}
}

export class HashUpdated implements Action {
  readonly type = HASH_UPDATED;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = UpdateHashParameter | HashUpdated;

