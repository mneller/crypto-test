import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {initialState, reducers, StateEffects} from "./app.state";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {AppRouterModule} from "./app-router.module";
import {HomeModule} from "./home/home.module";
import {SubscribeModule} from "./subscribe/subscribe.module";
import {LoginModule} from "./login/login.module";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


@NgModule({

  imports: [
    BrowserModule,
    ReactiveFormsModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([StateEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AppRouterModule, // <== This needs to be called after the subroute Modules.
                     // Means this isn't invariante against order!

  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [WebCryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }  // of class AppModule
