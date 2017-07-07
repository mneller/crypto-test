import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux-store';
import {NavActions} from '../nav-actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private reduxStore: NgRedux<IAppState>) { }

  ngOnInit() {
    this.reduxStore.dispatch(
      NavActions.selectComponent('Home')
    );
  } // of ngOnInit().

} // of class HomeComponent.
