import {Action, Reducer} from '@ngrx/store';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS= 'LOGOUT_SUCCESS';

const initialState = {
    current: null
};

export const auth: Reducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, {current: action.payload});

        case LOGOUT_SUCCESS:
            return Object.assign({}, initialState);

        default:
            return state;
    }
};