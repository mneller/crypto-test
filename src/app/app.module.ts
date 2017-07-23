import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// *** Redux: ***
import {Store, StoreModule} from '@ngrx/store';
import { rootReducer, IAppState, INIT_STATE} from './redux-store';

// *** Application components: ***
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WebCryptoService } from './web-crypto.service';

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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot({ rootReducer })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [WebCryptoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*
  constructor(reduxStore: NgRedux<IAppState>) {
    reduxStore.configureStore(rootReducer, INIT_STATE);
  } // of constructor.
  */
}  // of class AppModule
