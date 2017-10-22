import {Injectable} from '@angular/core';
import {HashParameter, HashUpdated, UPDATE_HASH_PARAMETER, UpdateHashParameter} from './home.actions';
import {HomeState} from './home.reducer';
import {Store} from '@ngrx/store';
import {HashAlgo, WebCryptoService} from '../shared/web-crypto.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HomeEffects {

  @Effect() updateHashValue = this.actions.ofType(UPDATE_HASH_PARAMETER).
  switchMap(  (p: UpdateHashParameter) => {
    console.log('EFFECT-UPDATE-HASH-PARAMETER: ' + JSON.stringify(p));
    const hashParam: HashParameter = p.payload;
    let result: Observable<string>;
    console.log('hashParam.hashAlgo: ' + hashParam.hashAlgo);
    console.log('HashAlgo.pbkdf2 ' + HashAlgo.pbkdf2);
    if (hashParam.hashAlgo === HashAlgo.pbkdf2) {
      console.log('pbkdf2');
      result = this.webCryptoService.pbkdf2Hash(
        hashParam.message,
        hashParam.saltText,
        hashParam.iterations,
        hashParam.bytes * 8
      );
    } else {
      console.log('sha256');
      result = this.webCryptoService.hashValue(hashParam.message);
    }
    return result.map((newHash: string) => new HashUpdated(newHash));
  }); // of Effect() updateHashValue.

  constructor(private actions: Actions, private store: Store<HomeState>, private webCryptoService: WebCryptoService) {}

} // of class HomeEffects.
