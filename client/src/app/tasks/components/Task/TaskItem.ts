import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import {NgFor} from 'angular2/common';

@Component({
    selector: 'task-item',
    directives: [NgFor],
    template: require('./TaskItem.html')
})
export class TaskItem {
    @Input()
    task;

    @Output()
    done: EventEmitter<any> = new EventEmitter(false);

    @Output()
    notDone: EventEmitter<any> = new EventEmitter(false);

    @Output()
    deleteTask: EventEmitter<any> = new EventEmitter(false);

    constructor() {
    }

    onDeleteTask(task) {
        this.deleteTask.emit(task);
    }
}
