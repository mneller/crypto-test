import { Component } from '@angular/core';
import { TextEncoder} from 'text-encoding-shim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cypto test!';
  exampleText = '';
  hashValue = '';

  onSubmit(formData) {
    console.log('OnSubmit');
    this.hashIt(this.exampleText);

  }

  hashIt(passcode: string): string {

    const arr = new Uint32Array(10);

    crypto.getRandomValues(arr);

    console.log('Your lucky numbers:');
    for (let i = 0; i < arr.length; i++) {
      console.log('==> ' + arr[i]);
    }

    console.log('hashIt ' + passcode);
    const uint8array = new TextEncoder('utf-8').encode(passcode);
    let result = '';
    crypto.subtle.digest('SHA-256', uint8array)
      .then(hash => {
        console.log('hex == ' + this.hex(hash));
        result = this.hex(hash);
        this.hashValue = result;
      }, (err) => {
         console.log(err);
         result = '';
      });
    this.hashValue = result;
    return result;
  }

  hex(buffer: ArrayBuffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      const value = view.getUint32(i);
      // toString(16) will give the hex representation of the number without padding
      const stringValue = value.toString(16);
      // We use concatenation and slice for padding
      const padding = '00000000';
      const paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join('');
  }
}
