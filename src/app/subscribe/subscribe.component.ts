import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux-store';
import { NavActions } from '../nav-actions';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private reduxStore: NgRedux<IAppState>) { }

  ngOnInit() {
    this.reduxStore.dispatch(
      NavActions.selectComponent('Subscribe')
    );
  } // of ngOnInit
}
