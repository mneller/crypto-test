import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {WebCryptoService} from './web-crypto.service';
import {appReducer, initialState, StateEffects} from "./app.state";
import {EffectsModule} from "@ngrx/effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'subscribe',      component: SubscribeComponent },
  { path: 'login',      component: LoginComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscribeComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot(<any>{app: appReducer}, {initialState}),
    EffectsModule.forRoot([StateEffects]),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    StoreRouterConnectingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [WebCryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }  // of class AppModule
