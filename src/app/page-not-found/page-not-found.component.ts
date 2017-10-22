import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../app.state';



@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _store: Store<State>) { }

  ngOnInit() { /*
    this._store.dispatch(
      NavActions.selectComponent('PageNotFound')
    ); */
  } // of ngOnInit
}

