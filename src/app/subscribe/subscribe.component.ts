import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../redux-store';
import { NavActions } from '../nav-actions';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private _store: Store<IAppState>) { }

  ngOnInit() {
    this._store.dispatch(
      NavActions.selectComponent('Subscribe')
    );
  } // of ngOnInit
}
