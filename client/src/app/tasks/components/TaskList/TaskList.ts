import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import {NgFor, NgIf} from 'angular2/common';

import {TaskItem} from '../Task/TaskItem';

import AddTaskForm from '../AddTaskForm/AddTaskForm';

@Component({
    selector: 'task-list',
    directives: [NgFor, NgIf, TaskItem, AddTaskForm],
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
