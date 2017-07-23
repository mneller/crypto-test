import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../redux-store';
import { NavActions } from '../nav-actions';
import { WebCryptoService } from '../web-crypto.service';

export interface HashDataSet {
  hashAlgo: string;
  exampleText: string;
  saltText: string;
  iterations: number;
  bits: number
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hashForm: FormGroup;

  hashData: HashDataSet = {
    hashAlgo: 'PBKDF2',
    exampleText: '',
    saltText: 'hugo',
    iterations: 1000,
    bits: 256
  };

  hashValue: Observable<string>;

  constructor(private _store: Store<IAppState>, private  cryptoService: WebCryptoService, private fb: FormBuilder) {

  } // of constructor.

  ngOnInit() {
    this._store.dispatch(
      NavActions.selectComponent('Home')
    );
    this.buildForm();
  } // of ngOnInit().

  buildForm() {

    this.hashForm = this.fb.group({
      hashAlgo: [this.hashData.hashAlgo ],
      exampleText: [this.hashData.exampleText],
      saltText: [this.hashData.saltText],
      iterations: [this.hashData.iterations],
      bits: [this.hashData.bits]
    });

    this.hashForm.valueChanges.subscribe(
      data => this.onValueChange(data)
    );

  } // of createForm().

  onValueChange(data?: any) {
    if (this.hashForm) {
      // Only if the hashForm is set!
      console.log('data: ' + JSON.stringify(data));
      console.log('this.hashForm.data: ' +  JSON.stringify(this.hashForm.value));
      this.hashData = this.hashForm.value;
    } // of this.hashForm.
  } // of onValueChange(data?: any).

  onSubmit() {
    console.log('exampleText = ' + this.hashData.exampleText);
    console.log('hashAlgo = ' + this.hashData.hashAlgo);

    if (this.hashData.hashAlgo === 'PBKDF2') {
      console.log('PBKDF2');
      this.hashValue = this.cryptoService.pbkdf2Hash(this.hashData.exampleText,
                                            this.hashData.saltText, this.hashData.iterations, this.hashData.bits);
    } else {
      console.log('SHA-256');
      this.hashValue = this.cryptoService.hashValue(this.hashData.exampleText);
    }
  } // onSubmit(...).

} // of class HomeComponent.
