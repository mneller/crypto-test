import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {WebCryptoService} from '../shared/web-crypto.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducer} from './home.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HomeEffects} from './home.effect';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeRoutes),
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [HomeComponent],
  providers: [WebCryptoService],
})
export class HomeModule {};
