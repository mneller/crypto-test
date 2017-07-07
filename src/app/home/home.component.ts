import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux-store';
import {NavActions} from '../nav-actions';
import {WebCryptoService} from "../web-crypto.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hashAlgo = "PBKDF2";
  exampleText = "";
  hashValue: Observable<string>;

  constructor(private reduxStore: NgRedux<IAppState>, private  cryptoService: WebCryptoService) {

  }

  ngOnInit() {
    this.reduxStore.dispatch(
      NavActions.selectComponent('Home')
    );
  } // of ngOnInit().

  onSubmit(formData: any) {
    //console.log(JSON.stringify(formData));
    console.log('exampleText = ' + this.exampleText);
    console.log('hashAlgo = ' + this.hashAlgo);

    if (this.hashAlgo === "PBKDF2") {
      console.log("PBKDF2");
      this.hashValue = this.cryptoService.pbkdf2Hash(this.exampleText, "hugo", 1000, 256);
    } else {
      console.log("SHA-256");
      this.hashValue = this.cryptoService.hashValue(this.exampleText);
    }
  } // onSubmit(...).

} // of class HomeComponent.
