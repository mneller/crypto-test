import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {SubscribeComponent} from './subscribe.component';
import {homeReducer} from "../home/home.reducer";
import {navReducer} from "../home/nav.reducer";

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeComponent ],
      imports: [StoreModule.forRoot({navState: navReducer, homeState: homeReducer})],
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
