import {Injectable} from 'angular2/core';
import {Action, Reducer, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import {ApiService} from '../services/api';
import {ITask} from './ITask';
import {ITasks, IAmount} from './ITasks';

export const ADDING_TASK = 'ADDING_TASK';
export const ADDED_TASK = 'ADDED_TASK';
export const LOADING_TASKS = 'LOADING_TASKS';
export const LOADED_TASKS = 'LOADED_TASKS';
export const UPDATING_TASK = 'UPDATING_TASK';
export const UPDATED_TASK = 'UPDATED_TASK';
export const DELETED_TASK = 'DELETE_TASK';
export const FILTERED_TASKS = 'FILTERED_TASKS';

const ADD_TASK = 'ADD_TASK';
const LOAD_TASKS = 'LOAD_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const FILTER_TASKS = 'FILTER_TASKS';


@Injectable()
export class Tasks {
    tasks$: Observable<ITask[]>;
    amount$: Observable<IAmount>;

    private actions$ = new BehaviorSubject<Action>({type: null, payload: null});

    constructor(private _store: Store<any>, api: ApiService) {
        const store$ = this._store.select<ITasks>('tasks');

        this.tasks$ = store$.map((store) => {
            return store.tasks;
        });

        this.amount$ = store$.map((store) => {
            return store.amount;
        });

        let adds = this.actions$
            .filter(action => action.type === ADD_TASK)
            .do(() => _store.dispatch({type: ADDING_TASK}))
            .mergeMap(
                action => api.createTask(action.payload),
                (action, payload: ITask) => ({type: ADDED_TASK, payload}));

        let loads = this.actions$
            .filter(action => action.type === LOAD_TASKS)
            .do(() => _store.dispatch({type: LOADING_TASKS}))
            .mergeMap(action => api.loadTasks(),
                (action, payload: ITask[]) => ({type: LOADED_TASKS, payload}));

        let updateOne = this.actions$
            .filter(action => action.type === UPDATE_TASK)
            .mergeMap(action => api.updateTask(action.payload),
                (action, payload: ITask) => ({type: UPDATED_TASK, payload: action.payload}));

        let deleteOne = this.actions$
            .filter(action => action.type === DELETE_TASK)
            .mergeMap(action => api.deleteTask(action.payload.id),
                (action, payload) => ({type: DELETED_TASK, payload: action.payload}));

        let filters = this.actions$
            .filter(action => action.type === FILTER_TASKS)
            .mergeMap(action => api.filterTasks(action.payload),
                (action, payload: ITask) => ({type: FILTERED_TASKS, payload}));

        Observable
            .merge(adds, loads, updateOne, deleteOne, filters)
            .subscribe((action: Action) => _store.dispatch(action));
    }

    addTask(task){
        this.actions$.next({type: ADD_TASK, payload: task});
    }

    loadTasks() {
        this.actions$.next({type: LOAD_TASKS});
    }

    updateTask(task: ITask) {
        this.actions$.next({type: UPDATE_TASK, payload: task});
    }

    filterTasks(filterName: string) {
        if(filterName === 'all'){
            this.loadTasks();
        } else {
            this.actions$.next({type: FILTER_TASKS, payload: filterName});
        }
    }

    deleteTask(task: ITask) {
        this.actions$.next({type: DELETE_TASK, payload: task});
    }
}
