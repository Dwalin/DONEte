import {Component} from 'angular2/core';

@Component({
    selector: 'login',
    template: `
        This is login page
    `
})
export class Login {
    constructor() {

    }

    logIn() {
        console.log('login page');
    }
}
