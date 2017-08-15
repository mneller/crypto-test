import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { AppState } from '../redux-store';
import { NavActions } from '../nav-actions';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(
      NavActions.selectComponent('PageNotFound')
    );
  } // of ngOnInit
}
