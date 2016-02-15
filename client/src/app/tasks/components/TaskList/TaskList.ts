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

    @Output()
    moveInSprint: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInTesting: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInDone: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInTodo: EventEmitter<any> = new EventEmitter(false);

    constructor() {

    }

    onDeleteTask(task) {
        this.deleteTask.emit(task);
    }

    onMoveInSprint(task) {
        this.moveInSprint.emit(task);
    }

    onMoveInDone(task) {
        this.moveInDone.emit(task);
    }

    onMoveInTesting(task) {
        this.moveInTesting.emit(task);
    }

    onMoveInTodo(task) {
        this.moveInTodo.emit(task);
    }
}
