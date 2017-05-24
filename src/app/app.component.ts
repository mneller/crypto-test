import { Component } from '@angular/core';
//import { TextEncoder } from 'text-encoding/lib/encoding.js'
import { TextEncoder, TextDecoder } from 'text-encoding-shim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cypto test!';
  exampleText = "";
  hashValue = "";

  onSubmit(formData) {
    console.log("OnSubmit");
    this.hashIt(this.exampleText);

  }

  hashIt(passcode: string):void {

    console.log("hashIt " + passcode)
    let uint8array = new TextEncoder('utf-8').encode(passcode);
    let result: any;
    result = crypto.subtle.digest("SHA-256", uint8array)
      .then(hash => {
        console.log("hex == " + this.hex(hash));

        this.hashValue = this.hex(hash);
      }, (err) => {
         console.log(err);
         return "";
      });
    return result.toString();
  }

  hex(buffer: ArrayBuffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
      // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      var value = view.getUint32(i)
      // toString(16) will give the hex representation of the number without padding
      var stringValue = value.toString(16)
      // We use concatenation and slice for padding
      var padding = '00000000'
      var paddedValue = (padding + stringValue).slice(-padding.length)
      hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join("");
  }
}
