import {Action, Reducer} from '@ngrx/store';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const initialState = {
    current: null
};

export const auth: Reducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, {current: action.payload});

        default:
            return state;
    }
};