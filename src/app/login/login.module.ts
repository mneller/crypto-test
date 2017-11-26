import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {reducer} from './login.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffects} from './login.effects';
import {AuthService} from '../shared/auth.service';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    StoreModule.forFeature('login', reducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [LoginComponent],
  providers: [AuthService],
  // exports: [RouterModule],
})
export class LoginModule {};
