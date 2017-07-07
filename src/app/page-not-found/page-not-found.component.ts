import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux-store';
import { NavActions } from '../nav-actions';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private reduxStore: NgRedux<IAppState>) { }

  ngOnInit() {
    this.reduxStore.dispatch(
      NavActions.selectComponent('PageNotFound')
    );
  } // of ngOnInit
}
