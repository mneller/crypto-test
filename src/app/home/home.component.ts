import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../redux-store';
import { NavActions } from '../nav-actions';
import {HashParameter, HomeState, INIT_HOME_STATE} from "./home.reducer";
import {HomeActions} from "./home-actions";
import {Observable} from "rxjs/Observable";
import {WebCryptoService} from "../web-crypto.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeState: Observable<HomeState>;

  hashForm: FormGroup;

  // TODO: Smart or dump component?
  hashParameter: HashParameter; //= INIT_HOME_STATE.hashParameter ;
  hashValue: string; //  = 'Hugo';

  //hashValue: Observable<string>;

  // *** Error Handling: ***
  formErrors = {
    hashAlgo: '',
    message: '',
    saltText: '',
    iterations: '',
    bytes: ''
  };

  validationMessages = {
    hashAlgo: '',
    message: '',
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

  constructor(private _store: Store<AppState>, private fb: FormBuilder, private webcrypto:WebCryptoService) {
    this.homeState =  this._store.select('homeState');
  }
  // of constructor.

  ngOnInit() {
    this._store.dispatch(
      NavActions.selectComponent('Home')
    );
    console.log("homeState === " + this.homeState);
/*
    this.homeState
    //this._store.select('homeState').
      .subscribe(p => {
        if(p) {
          console.log("p ==> " + JSON.stringify(p));
          this.hashParameter = p.hashParameter;
          this.hashValue = p.hashValue;
        } else {
          console.log("p is empty: " + JSON.stringify(p));
        }
      });
*/
    this._store.select(state => state.homeState)
      .subscribe(v => {
          console.log("homestate: hashParameter" + JSON.stringify(v.hashParameter));
          this.hashValue = v.hashValue;
          this.hashParameter = v.hashParameter;
        }
      );

    ;

    /* this._store.select(state => {
      console.log('**** state ==== ' + JSON.stringify(state));
      this.hashParameter = state.homeState.hashParameter;});
    */
    /*
    this._store.select(state => state.homeState)
      .map((value, index) => value)
      .subscribe(v => this.hashValue = v.hashValue);
*/
/*
    this._store.select('homeState', 'hashParameter')
        .subscribe( p => {
            console.log("(2) p ==> " + p);
            if (p) {
              this.hashParameter = p
            } else {
              console.log("p isn't true");
              this.hashParameter = INIT_HOME_STATE.hashParameter;
            }
          });
*/
    this.buildForm();

  } // of ngOnInit().

  buildForm() {

    this.hashForm = this.fb.group({
      hashAlgo: [this.hashParameter.hashAlgo ],
      message: [this.hashParameter.message],
      saltText: [this.hashParameter.saltText, [
      ]],
      iterations: [this.hashParameter.iterations, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000)
      ]],
      bytes: [this.hashParameter.bytes, [
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
      this.hashParameter = this.hashForm.value;
    } // of this.hashForm.
  } // of onValueChange(data?: any).

  onSubmit() {
    console.log('message = ' + this.hashParameter.message);
    console.log('hashAlgo = ' + this.hashParameter.hashAlgo);

    this._store.dispatch(HomeActions.updateHashParameter(this.hashParameter));
    // this.webcrypto.onHashParameterChange(this.hashParameter);
    /*
    if (this.hashParameter.hashAlgo === 'PBKDF2') {
      console.log('PBKDF2');
      this.hashValue = this.cryptoService.pbkdf2Hash(this.hashParameter.message, this.hashParameter.saltText,
                                            this.hashParameter.iterations, this.hashParameter.bytes * 8);
    } else {
      console.log('SHA-256');
      this.hashValue = this.cryptoService.hashValue(this.hashParameter.message);
    }
    */
  } // onSubmit().



} // of class HomeComponent.
