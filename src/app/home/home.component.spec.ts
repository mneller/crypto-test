import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store";

import { WebCryptoService } from '../web-crypto.service';
import { rootReducer } from "../redux-store";
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        // WebCryptoService,
        StoreModule.forRoot({ rootReducer })
      ],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [WebCryptoService],
    })
    .compileComponents();
    // MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
