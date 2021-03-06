import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SubscribeComponent} from './subscribe.component';

const subscribeRoutes: Routes = [
  { path: '', component: SubscribeComponent },
  // { path: '/subscribe', component: SubscribeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(subscribeRoutes)
  ],
  declarations: [SubscribeComponent],
  // exports: [RouterModule],
})
export class SubscribeModule {};
