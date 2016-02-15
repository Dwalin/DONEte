import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import {NgFor, NgIf} from 'angular2/common';

@Component({
    selector: 'task-item',
    directives: [NgFor, NgIf],
    template: require('./TaskItem.html')
})
export class TaskItem {
    @Input()
    task;

    @Output()
    moveInDone: EventEmitter<any> = new EventEmitter(false);

    @Output()
    deleteTask: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInSprint: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInTesting: EventEmitter<any> = new EventEmitter(false);

    @Output()
    moveInTodo: EventEmitter<any> = new EventEmitter(false);

    constructor() {
    }

    isShowAction(actionName: string): boolean{
        return actionName !== this.task.state;
    }

    onDeleteTask(task) {
        this.deleteTask.emit(task);
    }

    onMoveInSprint(task) {
        this.moveInSprint.emit(task);
    }

    onTestingTask(task) {
        this.moveInTesting.emit(task);
    }

    onMoveInDone(task) {
        this.moveInDone.emit(task);
    }

    onMoveInTodo(task) {
        this.moveInTodo.emit(task);
    }
}
