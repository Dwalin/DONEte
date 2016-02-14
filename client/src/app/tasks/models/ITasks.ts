import {ITask} from './ITask';

interface IAmount {
    all: number;
    todo: number;
    sprint: number;
    testing: number;
    done: number;
}

export interface ITasks {
    tasks: ITask[];
    amount: IAmount;
}