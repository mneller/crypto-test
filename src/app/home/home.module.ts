import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {WebCryptoService} from "../web-crypto.service";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [HomeComponent],
  providers: [WebCryptoService]
})
export class HomeModule {};
