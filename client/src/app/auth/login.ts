import {Component} from 'angular2/core';
import {FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/common';
import {Router} from 'angular2/router';
import AuthService from './services/auth';

@Component({
    selector: 'login',
    providers: [AuthService, FormBuilder],
    directives: [FORM_DIRECTIVES],
    template: require('./login.html')
})
export class Login {
    logInForm;
    logInModel = {
        login: '',
        password: ''
    };

    constructor(private auth: AuthService,
                private builder: FormBuilder,
                private router: Router) {

        this.auth.current$.subscribe((user) => {
            if(user){
                this.router.navigate(['Index']);
            }
        });

        this.logInForm = builder.group(
            {
                login: ['', Validators.required],
                password: ['', Validators.required]
            }
        );
    }

    logIn() {
        console.log('login page');
        this.auth.loginUser(this.logInModel);
    }
}
