import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(private _store: Store<State>) { }
  constructor() { }

  ngOnInit() {
    /*
    this._store.dispatch(
      NavActions.selectComponent('Login')
    );
    */
  } // of ngOnInit().

}
