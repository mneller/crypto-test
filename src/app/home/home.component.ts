import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  bytes: number
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
    bytes: 256 / 8
  };

  hashValue: Observable<string>;

  // *** Error Handling: ***
  formErrors = {
    hashAlgo: '',
    exampleText: '',
    saltText: '',
    iterations: '',
    bytes: ''
  };

  validationMessages = {
    hashAlgo: '',
    exampleText: '',
    saltText: '',
    iterations: {
      required: 'Interations is required.',
      min: 'Iterations must be greater or equal 1.',
      max: 'Iterations must be smaller than 1 000 000.'
    },
    bytes: {
      required: 'Bytes is required.',
      min: 'Bytes must be greater or equal 1.',
      max: 'Bytes must be smaller than 10 000.'
    }
  };

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
      saltText: [this.hashData.saltText, [
      ]],
      iterations: [this.hashData.iterations, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000)
      ]],
      bytes: [this.hashData.bytes, [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ]]
    });

    this.hashForm.valueChanges.subscribe(
      data => this.onValueChange(data)
    );

  } // of createForm().

  onValueChange(data?: any) {
    if (this.hashForm) {
      // Only if the hashForm is set!
      // console.log('data: ' + JSON.stringify(data));
      // console.log('this.hashForm.data: ' +  JSON.stringify(this.hashForm.value));
      const form = this.hashForm;

      Object.keys(this.formErrors).map(field => {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          Object.keys(control.errors).map(key => {
            this.formErrors[field] += messages[key] + ' ';
          });
        }
      });
      this.hashData = this.hashForm.value;
    } // of this.hashForm.
  } // of onValueChange(data?: any).

  onSubmit() {
    console.log('exampleText = ' + this.hashData.exampleText);
    console.log('hashAlgo = ' + this.hashData.hashAlgo);

    if (this.hashData.hashAlgo === 'PBKDF2') {
      console.log('PBKDF2');
      this.hashValue = this.cryptoService.pbkdf2Hash(this.hashData.exampleText, this.hashData.saltText,
                                            this.hashData.iterations, this.hashData.bytes * 8);
    } else {
      console.log('SHA-256');
      this.hashValue = this.cryptoService.hashValue(this.hashData.exampleText);
    }
  } // onSubmit().



} // of class HomeComponent.
