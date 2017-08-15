import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { AppState } from './redux-store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cypto test!';
  // exampleText = '';
  // hashValue = '';
  activeComponent: Observable<string>;
  activeComp = 'Home';

  constructor(private _store: Store<AppState>) {
    this.activeComponent = this._store.select('navState', 'activeComponent');
    this.activeComponent.subscribe(x => this.activeComp = x);
  } // of constructor.

  isActive(compName: string): boolean {
    return compName === this.activeComp;
  }
}
