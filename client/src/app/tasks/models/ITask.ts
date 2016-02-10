import {ITag} from './ITag';

export interface ITask {
    id: number;
    deadline: Date;
    tester: string;
    description: string;
    assignedBy: string;
    assignedTo: string;
    ticket: string;
    marker: string;
    state: string; // need to do  enum
    timeSpent: number;
    created: Date;
    modified: Date;
    users: Array<{user: Object}>;
    tags: ITag[];
}
