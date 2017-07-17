# CryptoTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Notes:
[WebCrypto-shim](https://github.com/vibornoff/webcrypto-shim)

## Planning:
1. Create a start page with login button in header and create user possibility
   1. Enable routing between Home, Subscribe, Login, User page 
      1. Create component and link home as start page => Done
      2. Create nav bar for selecting between components => Done
      3. On Home ensure the testing possibility of the hash functions => Done
      4. Eval all entries at home before processing hash function.
      
   2. Ensure visibility of User Page only if loged in. 
      
      (https://github.com/angular-redux/store/blob/master/articles/quickstart.md)
      1. Ensure state mgmt with Redux => Done
      2. Create the login page 
   3. Ensure User Creating with Subscribe
   4. Modify the Home page to show the hash modeles supported
   5. Create a AES page for logged in users

## Done
+ LINT review
+ Save to GIT Hub Repository


