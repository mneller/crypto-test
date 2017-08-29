import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {WebCryptoService} from '../web-crypto.service';
import {HashParameter, HomeState, State} from "../app.state";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeState: Observable<HomeState>;

  hashForm: FormGroup;

  hashParameter: HashParameter;
  hashValue: string;

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

  constructor(private _store: Store<State>, private fb: FormBuilder) {
    console.log('Home constructore');
    this.homeState =  this._store.select('app', 'homeState');
  }
  // of constructor.

  ngOnInit() {
    this.homeState
      .subscribe((v: HomeState) => {
          // console.log('homestate: v ' + JSON.stringify(v));
          this.hashValue = v.hashValue;
          this.hashParameter = v.hashParameter;
        }
      );
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

    this._store.dispatch({type: 'UPDATE_HASH_PARAMETER', payload: {hashParameter: this.hashParameter}});

  } // onSubmit().

} // of class HomeComponent.
