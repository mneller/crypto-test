import { Injectable } from '@angular/core';
import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class WebCryptoService {

  // ************************************
  // *** Parameters for this service: ***
  // ************************************
  public hashAlgo = 'SHA-256';
  public hashBits = 256;
    // Posssible values are SHA-1, SHA-256, SHA-384, and SHA-512.
    // Further information: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

  private enc = new TextEncoder('utf-8');
  private dec = new TextDecoder('utf-8');
  private myCrypto = crypto; // Just to encapsulate the dependency.
  private applicationSalt = 'xh3ff';
  private minimumInteration = 11223;

  constructor() { }

  // ***************************
  // *** Service Functions : ***
  // ***************************

  getUserPasswordHash(user: string, password: string) : Observable<string> {
    // get the user password hash with an automatic calculation of salt and iteration.
    // The salt is depending on the user name and the iterations on the password.
    // This ensures that each user has different  password hashes even if they use the same password.
    // The number of iterations is based on the password which makes is harder to attack data of a single user.
    return this.getSalt(user)
        .mergeMap( salt => {
          //console.log('salt == ' + salt);
          return this.getIterations(password)
              .mergeMap(iterations => {
                //console.log('iterations == ' + iterations);
                return this.pbkdf2Hash(password, salt, iterations, this.hashBits);
          })
        });
  } // of getUserPasswordHash(...).

  // ***********************
  // *** Hash Functions: ***
  // ***********************
  hashValue(v: string): Observable<string> {
    let buf = this.enc.encode(v);
    return Observable.fromPromise(this.myCrypto.subtle.digest(this.hashAlgo, buf))
      .map(x => this.hexString(x));
  } // of  hashValue(v: string): Observable<string>.


  pbkdf2Hash(code:string, salt: string, interations: number, nbOfBits: number): Observable<string> {
    // Returns a PBKDF2 hash string observable of the code calculated based on the given parameters
    const bytes = this.enc.encode(code);

    const saltBytes = this.enc.encode(salt);

    // Create the base key to derive from.
    const importedKey = this.myCrypto.subtle.importKey(
      'raw', bytes, 'PBKDF2', false, ['deriveBits']);

    let result = importedKey.then(key => {
      // Salt should be at least 64 bits.
      //let salt = crypto.getRandomValues(new Uint8Array(8));
      // All required PBKDF2 parameters.
      const params = {name: 'PBKDF2', hash: this.hashAlgo, salt: saltBytes, iterations: interations};
      //console.log('params == ' + JSON.stringify(params));
      // Derive 160 bits using PBKDF2.
      return this.myCrypto.subtle.deriveBits(params, key, nbOfBits);
    });

    return Observable.fromPromise(result)
      .map(x => this.hexString(x));
  } // of pbkdf2Hash(code): Obserable<string>

  // ****************************
  // *** Symetric encryption: ***
  // ****************************
  private encryptName = 'AES-GCM';
  private encryptBits = 256; // can be also 32, 64, 96, 104, 112, 120 or 128 (default)


  encryptAES(passcode: string, message: string):Observable<string> {
    // passcode: the initialization string for the AES encryption
    // message: the messate to encrypt.
    // Result is an Obserable on the encrypted message string.
    const bytes = this.enc.encode(passcode);
    const salt = this.enc.encode('hugo');
    const iv = this.enc.encode("hugohugohugohugo");

    return Observable.fromPromise(
      this.myCrypto.subtle.importKey(
        "raw", bytes, {"name": "PBKDF2"}, false, ["deriveKey"]
    ).then(baseKey => {
        return this.myCrypto.subtle.deriveKey(
          { "name": "PBKDF2",
            "salt":  salt,
            "iterations": 35,
            "hash": this.hashAlgo
          },
          baseKey,
          {"name": this.encryptName , "length": this.encryptBits}, // Key we want
          false,                               // Extrable
          ["encrypt", "decrypt"]              // For new key
        );
    }).then(deriveKey => {
        return this.myCrypto.subtle.encrypt(
          { name: this.encryptName, iv:iv },
          deriveKey,
          this.enc.encode(message)
        )
      })
    ).map(x => this.hexString(x));
  } //encryptAES(passcode: string, message: string).

  decryptAES(passcode: string, message: string):Observable<string> {
    // passcode: the initialization string for the AES encryption
    // message: the messate to encrypt.
    // Result is an Obserable on the encrypted message string.
    const bytes = this.enc.encode(passcode);
    const salt = this.enc.encode('hugo');
    const iv = this.enc.encode("hugohugohugohugo");

    return Observable.fromPromise(
      this.myCrypto.subtle.importKey(
        "raw", bytes, {"name": "PBKDF2"}, false, ["deriveKey"]
    ).then(baseKey => {
      //console.log("base key generated");
      return this.myCrypto.subtle.deriveKey(
          { "name": "PBKDF2",
            "salt":  salt,
            "iterations": 35,
            "hash": this.hashAlgo
          },
          baseKey,
          {"name": this.encryptName , "length": this.encryptBits}, // Key we want
          false,                               // Extrable
          ["encrypt", "decrypt"]              // For new key
        );
    }).then(deriveKey => {
        //console.log("Derived key");
        return this.myCrypto.subtle.decrypt(
          { name: this.encryptName, iv:iv },
          deriveKey,
          this.parseHexString(message)
        );
      })
    ).map(x => {
      //console.log("x == " + x);
      return this.dec.decode(new Uint8Array(x));
    });
  } //decryptAES(passcode: string, message: string).


/*  encryptAES(iv: string, message: string):Observable<string> {
    // iv: the initialization string for the AES encryption
    // message: the messate to encrypt.
    // Result is an Obserable on the encrypted message string.
    const bytes = this.enc.encode(iv + '012345678910111213').slice(0, 16);

    console.log('bytes:' + bytes);
    let aesKey = this.myCrypto.subtle.importKey(
      'raw',
      bytes,
      { name: this.encryptName,
        length: this.encryptBits
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    let result = aesKey.then(key => {
      const params = {
        name: this.encryptName,
        //iv: this.enc.encode(iv)
        iv: bytes
      };
      return this.myCrypto.subtle.encrypt(
        params,
        key,
        this.enc.encode(message)
      );
    });
    return Observable.fromPromise(result)
      .map(x => this.hexString(x));
  } // of encryptAES(iv: string).

  decryptAES(iv: string, message: string):Observable<string> {
    // iv: the initialization string for the AES encryption
    // message: the messate to encrypt.
    // Result is an Obserable on the encrypted message string.
    const bytes = this.enc.encode(iv + '012345678910111213').slice(0, 16);

    console.log('bytes:' + bytes);
    let aesKey = this.myCrypto.subtle.importKey(
      'raw',
      bytes,
      { name: this.encryptName,
        //iv: bytes,
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    let result = aesKey.then(key => {
      const params = {
        name: this.encryptName,
        iv: bytes,
        byteLength: 128
      };
      return this.myCrypto.subtle.decrypt(
        params,
        key,
        this.enc.encode(message)
      );
    });
    return Observable.fromPromise(result)
      .map(x => this.hexString(x));
  } // of encryptAES(iv: string).
*/
  // ***********************
  // *** Help functions: ***
  // ***********************

  getSalt(user: string) :Observable<string> {
      return this.hashValue(this.applicationSalt + user);
  } // of getSalt(user:string).

  getIterations(password: string) :Observable<number> {
    return this.hashValue(password)
      .map(hash => {
        return parseInt(hash.substr(7, 3), 16) + this.minimumInteration;
      });
  } // of getSalt(user:string).

/*
  hexString(buffer: ArrayBuffer):string {
    // ToDo Revwork this function. Works only smart if lenth % 4 = 0!
    let hexCodes = [];
    let view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      let value = view.getUint32(i);
      // toString(16) will give the hex representation of the number without padding
      let stringValue = value.toString(16);
      // We use concatenation and slice for padding
      let padding = '00000000';
      let paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join('');
  } // of hexString(buffer: ArrayBuffer):string.
*/
  hexString(buffer: ArrayBuffer):string {
    let bytes = new Uint8Array(buffer);
    let result = '';
    bytes.forEach(byte => {
      if (byte < 0 || byte > 255) {
        console.error('Error: Wrong byte = ' + byte);
      } else {
        const hex = byte.toString(16);
        if (byte < 16) {
          result += '0';
        }
        result += hex;
      }
    });
    return result;
  } // of hexString(buffer: ArrayBuffer):string.

  parseHexString(str: string):Uint8Array {
    // console.log('str ===' + str.length);
    let result = new Uint8Array(str.length / 2);
    let index = 0
    while (str.length >= 2) {
      result[index++] = parseInt(str.substring(0, 2), 16);
      str = str.substring(2, str.length);
    }

  return result;
}


}
