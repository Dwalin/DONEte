import {Action, Reducer} from '@ngrx/store';

import {ITask} from '../models/ITask';
import {IAmount} from '../models/ITasks';

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
            state.amount[action.payload.data.state] += 1;
            state.amount.all += 1;
            return Object.assign({}, state);

        case UPDATING_TASK:
            return Object.assign(state, action.payload);

        case FILTERED_TASKS:
        case LOADED_TASKS:
            state.tasks = [...action.payload.data];
            state.amount = action.payload.meta.amount;
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


//TODO remove
function calcTasksAmont(tasks: ITask[]){
    let amount: IAmount = <IAmount>{};

    amount.all = tasks.length;
    amount.todo = tasks.filter((task: ITask) => task.state === 'todo').length;
    amount.sprint = tasks.filter((task: ITask) => task.state === 'sprint').length;
    amount.testing = tasks.filter((task: ITask) => task.state === 'testing').length;
    amount.done = tasks.filter((task: ITask) => task.state === 'done').length;

    return amount;
}
