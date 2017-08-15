
import {MyAction} from "../nav-actions";
import {HashParameter} from "./home.reducer";

export class HomeActions {

  static hashAlgorithm = [
    'PBKDF2',
    'SHA-256'
  ];

  static UPDATE_HASH_PARAMETER = 'UPDATE_HASH_PARAMETER';
  static NEW_HASH = 'NEW_HASH'

  static updateHashParameter(hashParameter: HashParameter) : MyAction {
    return {
      type: this.UPDATE_HASH_PARAMETER,
      payload: hashParameter
    };
  } // of static calcNewHash(hashData: HashParameter)

  static newHash(hash: string) : MyAction {
    return {
      type: this.NEW_HASH,
      payload: hash
    };
  } // of
} // of  class HomeActions
