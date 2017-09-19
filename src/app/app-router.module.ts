import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {environment} from "../environments/environment";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'subscribe',  loadChildren: 'app/subscribe.module#SubscribeModule' },
  { path: 'login',      loadChildren: 'app/login/login-module#LoginModule' },
  { path: '**', loadChildren: 'app/page-not-found/page-not-found-module#PageNotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { enableTracing: !environment.production })], // <-- debugging purposes only],
  exports: [RouterModule]
})
export class AppRouterModule {};

