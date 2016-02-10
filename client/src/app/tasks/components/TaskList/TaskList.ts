import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import {NgFor} from 'angular2/common';

import {TaskItem} from '../Task/TaskItem';

@Component({
    selector: 'task-list',
    directives: [NgFor, TaskItem],
    template: require('./TasksList.html')
})
export class TaskList {
    @Input()
    tasks;

    @Output()
    deleteTask = new EventEmitter(false);

    constructor() {

    }

    onDeleteTask(task) {
        this.deleteTask.emit(task);
    }
}