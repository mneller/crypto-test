import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from "../app.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _store: Store<State>) { }

  ngOnInit() {
    /*
    this._store.dispatch(
      NavActions.selectComponent('Login')
    );
    */
  } // of ngOnInit().

}
