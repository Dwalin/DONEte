import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

import {Action, Store} from '@ngrx/store';

import {IUser} from '../models/IUser';
import {IAuth} from '../models/IAuth';

import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_USER
} from '../reducers/auth';

@Injectable()
export default class AuthService {
    current$: Observable<IUser>;

    private actions$ = new BehaviorSubject<Action>({type: null, payload: null});

    constructor(private http: Http,
                private _store: Store<any>) {

        const store$ = this._store.select<IAuth>('auth');

        this.current$ = store$.map((store) => store.current);

        const login = this.actions$
            .filter((action) => action.type === LOGIN_USER)
            .mergeMap(action => this.loginUserAPI(action.payload)).share();

        const loginSuccess$ = login.filter((payload: any) => {
                return payload && payload.data.token !== null
            })
            .map((payload: any) => ({type: LOGIN_SUCCESS, payload: payload.data}));

        const loginFailure$ = login.filter((payload: any) => {
                return payload && payload.data.token == null
            })
            .map((payload: any) => ({type: LOGIN_FAILURE, payload: payload.data}));

        const logout = this.actions$
            .filter((action) => action.type === LOGOUT_USER)
            .mergeMap(action => this.logoutUserAPI(),
                () => {
                    return {type: LOGOUT_SUCCESS}
                });

        Observable
            .merge(loginSuccess$, loginFailure$, logout)
            .subscribe((action: Action) => _store.dispatch(action));
    }

    loginUserAPI(loginData: Object) {
        return this.http
            .post('/api/auth/login', JSON.stringify(loginData))
            .map((res: Response) => res.json());
    }

    logoutUserAPI() {
        return this.http
            .post('/api/auth/logout', '')
            .map((res: Response) => res.json());
    }

    loginUser(loginData: Object) {
        this.actions$.next({type: LOGIN_USER, payload: loginData})
    }

    logout() {
        this.actions$.next({type: LOGOUT_USER})
    }
}