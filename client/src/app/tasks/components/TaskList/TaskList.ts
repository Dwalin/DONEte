import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import {NgFor, NgIf} from 'angular2/common';

import {TaskItem} from '../Task/TaskItem';


@Component({
    selector: 'task-list',
    directives: [NgFor, NgIf, TaskItem],
    template: require('./TasksList.html')
})
export class TaskList {
    @Input()
    tasks;

    @Input()
    notFoundMsg: string = 'Tasks not found!';

    @Output()
    deleteTask = new EventEmitter(false);

    constructor() {

    }

    onDeleteTask(task) {
        this.deleteTask.emit(task);
    }
}
