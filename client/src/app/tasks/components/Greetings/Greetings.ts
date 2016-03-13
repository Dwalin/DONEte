import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import AuthService from '../../../auth/services/auth';

@Component({
    selector: 'greetings',
    providers: [AuthService],
    template: require('./greetings.html')
})
export default class Greetings {
    logout: Function;

    @Input()
    username: String;

    constructor(private auth: AuthService,
                private router: Router) {
        
        this.auth.current$.subscribe((user) => {
            if (!user) {
                this.router.navigate(['Login']);
            }
        });

        this.logout = (e: Event) => {
            e.preventDefault();

            auth.logout();
        }
    }
}