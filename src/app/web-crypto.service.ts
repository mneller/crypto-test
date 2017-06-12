import { Injectable } from '@angular/core';
import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class WebCryptoService {

  // ************************************
  // *** Parameters for this service: ***
  // ************************************
  public hashAlgo = "SHA-256";
    // Posssible values are SHA-1, SHA-256, SHA-384, and SHA-512.
    // Further information: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

  private enc = new TextEncoder('utf-8');
  private dec = new TextDecoder('utf-8');
  private myCrypto = crypto; // Just to encapsulate the dependency.

  constructor() { }

  // ***********************
  // *** Hash Functions: ***
  // ***********************
  hashValue(v: string): Observable<string> {
    let buf = this.enc.encode(v);
    return Observable.fromPromise(this.myCrypto.subtle.digest(this.hashAlgo, buf))
      .map(x => this.hexString(x));
  } // of  hashValue(v: string): Observable<string>.



  // ***********************
  // *** Help functions: ***
  // ***********************
  hexString(buffer: ArrayBuffer):string {
    let hexCodes = [];
    let view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      let value = view.getUint32(i)
      // toString(16) will give the hex representation of the number without padding
      let stringValue = value.toString(16)
      // We use concatenation and slice for padding
      let padding = '00000000'
      let paddedValue = (padding + stringValue).slice(-padding.length)
      hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join("");
  } // of hexString(buffer: ArrayBuffer):string.

}
