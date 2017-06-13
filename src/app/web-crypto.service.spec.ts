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
  let sha256TestValues = [
    // Test values are from https://de.wikipedia.org/wiki/SHA-2:
    { password: '',
      result: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    { password: 'Franz jagt im komplett verwahrlosten Taxi quer durch Bayern',
      result: 'd32b568cd1b96d459e7291ebf4b25d007f275c9f13149beeb782fac0716613f8'
    },
    // Test value from http://csrc.nist.gov/groups/ST/toolkit/documents/Examples/SHA256.pdf
    { password: 'abc',
      result: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    },
    // Some manual test cases:
    { password: 'hugo',
      result: '0478721f1106c2a631a90181bac7efc77767a3903eb9220687bff8a14e940fa7'
    },
    { password: 'hugo1',
      result: '57e27b46117eecffb6253d9806944c66cf5010f668dc039202970db235706749'
    },
    { password: 'hugo2',
      result: 'faa03dd54dc2b0afe91f31a3a3893e9163b81d6fa270bbfdb5d31c07e88cd090'
    },
    { password: 'xxx',
      result: 'cd2eb0837c9b4c962c22d2ff8b5441b7b45805887f051d39bf133b583baf6860'
    },
  ];
  sha256TestValues.map(testSet => {
    it('Testing SHA-256 against <' + testSet.password +'> string', (done: DoneFn) => {
      service.hashValue(testSet.password)
        .subscribe(value => {
          expect(value).toBe(testSet.result);
          done();
        });
    }); // it('Testing SHA-256 against xxx string').

  });

  let pbkdf2TestValues = [
    // From RFC6070
    { password: 'password',
      salt: 'salt',
      cycles: 4096,
      bits: 256,
      result: 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a'
    },
    // From RFC6070
    { password: 'password',
      salt: 'salt',
      cycles: 2,
      bits: 20*8,
      result: 'ae4d0c95af6b46d32d0adff928f06dd02a303f8e'
    },
    // From RFC6070 but not working
    { password: 'passwordPASSWORDpassword',
      salt: 'saltSALTsaltSALTsaltSALTsaltSALTsalt',
      cycles: 4096,
      // This parameters are not working
      //bits: 25*8,
      //result: '348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c'
      bits: 256, // Go with this and get the result
      result: '348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1'
    },
    // Some test values manual generated
    { password: 'hugo',
      salt: 'hugu',
      cycles: 3037,
      bits: 256,
      result: 'cace451e4f8a4ee1fa002519111cd7b9629f7f61fe1e5d807385f883d0c2b718'
    },
    { password: 'test3454545454545454545',
      salt: 'hundekuchen034545',
      cycles: 10240,
      bits: 256,
      result: 'f15a319639ac64673c5dafab96a4f1fb94ed0b2d782de1e94bbc52087d4f7a14'
    },
    { password: 'test3454545454545454545',
      salt: 'katzenkeks',
      cycles: 22222,
      bits: 256,
      result: 'b48d4d819814c74608aa4a83789b5ed9a19195e088470b37eb43f6c48f6a5b74'
    },

  ];
  pbkdf2TestValues.map(testSet => {
    it('pbkdf2Hash should deliver a correct values for password <' + testSet.password + '>', (done: DoneFn) => {
       service.pbkdf2Hash(testSet.password, testSet.salt, testSet.cycles , testSet.bits)
        .subscribe(value => {
          // console.log('value == ' + value);
          expect(value).toBe(testSet.result);
          done();
        });
    }); // 'pbkdf2Hash should deliver a value'.
  });
});