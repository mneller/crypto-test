import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserComponent} from "./user.component";

const loginRoutes: Routes = [
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [UserComponent],
})
export class UserModule {};
