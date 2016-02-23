import {Action, Reducer} from '@ngrx/store';

export const users: Reducer<any> = (state = {}, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};