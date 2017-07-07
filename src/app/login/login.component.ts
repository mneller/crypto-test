import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux-store';
import { NavActions } from '../nav-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private reduxStore: NgRedux<IAppState>) { }

  ngOnInit() {
    this.reduxStore.dispatch(
      NavActions.selectComponent('Login')
    );
  } // of ngOnInit().

}
