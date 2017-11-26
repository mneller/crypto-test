import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export interface User {
  username: string;
  password: string; // Encrypted Password
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
}

export const EMPTY_USER: User = {
  username: '',
  password: '', // Encrypted Password
  firstName: '',
  lastName: '',
  isLoggedIn: false
};

export const testUsers: Array<User> = [
  {
    username: 'eller',
    password: 'hugo',
    firstName: 'Martin',
    lastName: 'Ellermeier',
    isLoggedIn: false
  },
  {
    username: 'test',
    password: 'test',
    firstName: 'Hugo Test',
    lastName: 'Tester',
    isLoggedIn: false
  },
];

@Injectable()
export class AuthService {

  users = testUsers;
  currUser: User = null;

  constructor() { }

  login(userName: string, password: string): Observable<User> {
    this.currUser = EMPTY_USER;
    this.users.filter(user => (user.username === userName && user.password === password))
      .map(user => this.currUser = user);
    return of(this.currUser);
  } // of loginUser(...).



}
