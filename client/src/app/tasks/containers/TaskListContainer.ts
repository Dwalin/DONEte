import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';

import {Tasks} from '../models/Tasks';
import {ITask} from '../models/ITask';

import {TaskList} from '../components/TaskList/TaskList';
import {TaskFilter} from '../components/Filters/TaskFilter/TaskFilter';
import AddTaskForm from '../components/AddTaskForm/AddTaskForm';

const ALL_FILTER = 'all';

@Component({
    selector: 'tasks-list-container',
    directives: [NgIf, TaskList, TaskFilter, AddTaskForm],
    template: require('./TaskListContainer.html'),
    providers: [Tasks]
})
export class TaskListContainer {
    tasks = {
        todo: [],
        inSprint: [],
        testing: [],
        done: [],
    };

    currentFilter: string = ALL_FILTER;

    constructor(public tasksService: Tasks) {
        tasksService.loadTasks();

        tasksService.tasks$.subscribe((tasks: ITask[]) => {
            this.tasks.todo = tasks.filter((task: ITask) => task.state === 'todo');
            this.tasks.inSprint = tasks.filter((task: ITask) => task.state === 'sprint');
            this.tasks.testing = tasks.filter((task: ITask) => task.state === 'testing');
            this.tasks.done = tasks.filter((task: ITask) => task.state === 'done');
        });
    }

    onDeleteTask(task: ITask): void {
        this.tasksService.deleteTask(task);
    }

    onFilterTasks(filterName: string): void {
        this.currentFilter = filterName;

        this.tasksService.filterTasks(filterName);
    }

    showSection(sectionName: string): boolean{
        return this.currentFilter === ALL_FILTER || this.currentFilter === sectionName;
    }
}