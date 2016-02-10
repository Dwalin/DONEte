import {ITask} from './ITask';

export interface ITasks extends Map<String, any> {
    tasks: ITask[];
}
