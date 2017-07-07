import { Component } from '@angular/core';
import { select} from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cypto test!';
  // exampleText = '';
  // hashValue = '';
  @select() readonly activeComponent: Observable<string>;
  activeComp = 'Home';

  constructor() {
    this.activeComponent.subscribe(x => this.activeComp = x);
  } // of constructor.

  isActive(compName: string): boolean {
    return compName === this.activeComp;
  }
}
