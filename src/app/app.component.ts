import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cypto test!';

  constructor(private _store: Store<State>) {
    // this.activeComponent = this._store.select('navState', 'activeComponent');
    // this.activeComponent.subscribe(x => this.activeComp = x);
  } // of constructor.

}
