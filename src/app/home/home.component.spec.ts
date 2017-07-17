import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { WebCryptoService } from '../web-crypto.service';
import { HomeComponent } from './home.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [NgReduxTestingModule, BrowserModule, ReactiveFormsModule, WebCryptoService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [WebCryptoService],
    })
    .compileComponents();
    MockNgRedux.reset();
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
