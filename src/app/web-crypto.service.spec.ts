// import { TestBed, inject } from '@angular/core/testing';

import { WebCryptoService } from './web-crypto.service';
import 'rxjs/add/operator/take';
import {fakeAsync, tick} from "@angular/core/testing";
/*
describe('WebCryptoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebCryptoService]
    });
  });

  it('should be created', inject([WebCryptoService], (service: WebCryptoService) => {
    expect(service).toBeTruthy();
  }));
});
*/

describe('Test WebCryptoService without the TestBed', () => {
  let service: WebCryptoService;

  beforeEach(() => {
    service = new WebCryptoService();
  });

  // Test values are from https://de.wikipedia.org/wiki/SHA-2:
  it('Testing SHA-256 against empty string', (done: DoneFn) => {
    service.hashValue("")
      .subscribe(value => {
        expect(value).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        done();
      });
  }); // it('Testing SHA-256 against empty string').


  it('Testing SHA-256 against "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern" string', (done: DoneFn) => {
    service.hashValue('Franz jagt im komplett verwahrlosten Taxi quer durch Bayern')
      .subscribe(value => {
        expect(value).toBe('d32b568cd1b96d459e7291ebf4b25d007f275c9f13149beeb782fac0716613f8');
        done();
      });
  }); // it('Testing SHA-256 against "Franz..."').

  // Test value from http://csrc.nist.gov/groups/ST/toolkit/documents/Examples/SHA256.pdf
  it('Testing SHA-256 against "abc" string', (done: DoneFn) => {
    service.hashValue('abc')
      .subscribe(value => {
        expect(value).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
        done();
      });
  }); // it('Testing SHA-256 against "abc"').


});
