import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from "@ngrx/store";

import { LoginComponent } from './login.component';
import { rootReducer } from "../redux-store";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ StoreModule.forRoot({ rootReducer})],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
