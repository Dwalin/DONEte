import {Action, Reducer} from '@ngrx/store';

import {
    ADDING_TASK,
    ADDED_TASK,
    LOADING_TASKS,
    LOADED_TASKS,
    UPDATING_TASK,
    UPDATED_TASK,
    DELETED_TASK,
    FILTERED_TASKS
} from '../models/Tasks';

export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';

export const tasks: Reducer<any> = (state = [], action: Action) => {
    switch (action.type) {
        case ADDING_TASK:
            return state;

        case UPDATING_TASK:
            return Object.assign(state, action.payload);

        case FILTERED_TASKS:
        case LOADED_TASKS:
            return [...action.payload.data];

        case DELETED_TASK:
            return state.filter(task => task.id !== action.payload);

        default:
            return state;
    }
};
