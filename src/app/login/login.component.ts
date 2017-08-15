import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import { AppState } from '../redux-store';
import { NavActions } from '../nav-actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(
      NavActions.selectComponent('Login')
    );
  } // of ngOnInit().

}
