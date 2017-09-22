import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {environment} from "../environments/environment";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  // { path: 'home', component: HomeComponent },
  // { path: 'subscribe',  loadChildren: 'app/subscribe/subscribe.module#SubscribeModule' },
  // { path: 'login',       loadChildren: 'app/login/login.module#LoginModule' },
  // { path: '**', loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule' }
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
     { enableTracing: !environment.production })], // <-- debugging purposes only],
   exports: [RouterModule]
})
export class AppRouterModule {};

