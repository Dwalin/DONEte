import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Tasks} from '../models/Tasks';

import {TaskList} from '../components/TaskList/TaskList';
import {TaskFilter} from '../components/Filters/TaskFilter/TaskFilter';

@Component({
    selector: 'tasks-list-container',
    directives: [TaskList, TaskFilter],
    template: require('./TaskListContainer.html'),
    providers: [Tasks],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainer {
    constructor(public tasks: Tasks) {
        tasks.loadTasks();
    }

    onDeleteTask(task) {
        this.tasks.deleteTask(task);
    }

    onFilterTasks(filterName) {
        this.tasks.filterTasks(filterName);
    }
}