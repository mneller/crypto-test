
import { TestBed, async } from '@angular/core/testing';
// import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './redux-store';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpModule,
        FormsModule,
        StoreModule.forRoot({ rootReducer })
      ],
      providers: [
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Crypto test!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Cypto test!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Cypto test!');
  }));
});
