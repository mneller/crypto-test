import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from "@ngrx/store";

import { SubscribeComponent } from './subscribe.component';

import { rootReducer } from "../redux-store";

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeComponent ],
      imports: [StoreModule.forRoot({rootReducer})],
    }).compileComponents();
    // MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
