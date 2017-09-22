import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {WebCryptoService} from './web-crypto.service';
import {appReducer, initialState, StateEffects} from "./app.state";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {AppRouterModule} from "./app-router.module";
import {HomeModule} from "./home/home.module";
import {SubscribeModule} from "./subscribe/subscribe.module";
import {PageNotFoundModule} from "./page-not-found/page-not-found.module";
import {UserModule} from "./user/user.module";
import {LoginModule} from "./login/login.module";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


@NgModule({

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // HttpModule,

    HomeModule,
    SubscribeModule,
//    UserModule,
    LoginModule,
//    PageNotFoundModule,

    AppRouterModule, // <== This needs to be called after the subroute Modules.
                     // Means this isn't invariante against order!

    StoreModule.forRoot(<any>{app: appReducer}, {initialState}),
    EffectsModule.forRoot([StateEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
