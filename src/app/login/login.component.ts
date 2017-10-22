import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService, User} from "../shared/auth.service";
import {getLoginState, LoginState} from "./login.reducer";
import {Store} from "@ngrx/store";
import {TryLogin} from "./login.actions";
import {Observable} from "rxjs/Observable";
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginState: Observable<LoginState>;
  loginForm: FormGroup;
  user: User;
  errorMessage: string | null = null;
  constructor(private store: Store<LoginState>, private fb: FormBuilder) {
    this.loginState = this.store.select(getLoginState);
  }

  ngOnInit() {
    this.loginState.subscribe( (loginState: LoginState) => {
      console.log('LoginComponent->ngOnInit->subscribe to loginState' + JSON.stringify(loginState));
      this.errorMessage = loginState.loginError;
      this.user = loginState.user;
    });

    this.buildForm();
  } // of ngOnInit().

  buildForm() {
    this.loginForm = this.fb.group({
      username: [this.user.username],
      password: [this.user.password]
    });
  }

  onSubmit() {
    console.log("Submit");
    this.store.dispatch(new TryLogin(this.loginForm.value));
  }
}
