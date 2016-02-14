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

import {ITasks} from '../models/ITasks';

const initState: ITasks = {
    tasks: [],
    amount:{
        all: 0,
        sprint: 0,
        todo: 0,
        testing: 0,
        done: 0
    }
};

export const tasks: Reducer<any> = (state = initState, action: Action) => {
    switch (action.type) {
        case ADDED_TASK:
            state.tasks = [action.payload.data, ...state.tasks];
            return Object.assign({}, state);

        case UPDATING_TASK:
            return Object.assign(state, action.payload);

        case FILTERED_TASKS:
        case LOADED_TASKS:
            state.tasks = [...action.payload.data];
            return Object.assign({}, state);

        case DELETED_TASK:
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            state.amount[action.payload.state] -= 1;
            state.amount.all -= 1;
            return Object.assign({}, state);

        default:
            return state;
    }
};
