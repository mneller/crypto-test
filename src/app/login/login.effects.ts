
import {Injectable} from "@angular/core";
import {LoginState} from "./login.reducer";
import {AuthService, User} from "../shared/auth.service";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {Authentication, LoginFails, LoginSuccessful, TRY_LOGIN, TryLogin} from "./login.actions";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginEffects {

  @Effect() tryLogin = this.actions.ofType(TRY_LOGIN).
    //switchMap( (p: TryLogin) => {
    switchMap( (p: TryLogin) => {
      console.log('TRY-LOGIN: ' + JSON.stringify(p));
      const authData: Authentication = p.payload;
      let result: Observable<User>;
      result = this.authService.login(p.payload.username, p.payload.password);
      return result.map((user: User) => {
        if(user.isLoggedIn) {
          return new LoginSuccessful(user)
        }
        return new LoginFails('Wrong Password or User!');
    })
  }); // of Effect() tryLogin

  constructor(private actions: Actions, private store: Store<LoginState>, private authService: AuthService ) {}
}
