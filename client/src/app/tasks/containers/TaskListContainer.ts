import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';

import {Tasks} from '../models/Tasks';
import {ITask} from '../models/ITask';

import {TaskList} from '../components/TaskList/TaskList';
import {TaskFilter} from '../components/Filters/TaskFilter/TaskFilter';
import AddTaskForm from '../components/AddTaskForm/AddTaskForm';
import Greetings from '../components/Greetings/Greetings';
import AuthSrvice from '../../auth/services/auth';

const ALL_FILTER = 'all';

@Component({
    selector: 'tasks-list-container',
    directives: [NgIf, TaskList, TaskFilter, AddTaskForm, Greetings],
    template: require('./TaskListContainer.html'),
    providers: [Tasks, AuthSrvice]
})
export class TaskListContainer {
    username: String = '';

    tasks = {
        todo: [],
        inSprint: [],
        testing: [],
        done: [],
    };

    currentFilter: string = ALL_FILTER;

    constructor(public tasksService: Tasks,
                private auth: AuthSrvice) {
        tasksService.loadTasks();

        tasksService.tasks$.subscribe((tasks: ITask[]) => {
            this.tasks.todo = tasks.filter((task: ITask) => task.state === 'todo');
            this.tasks.inSprint = tasks.filter((task: ITask) => task.state === 'sprint');
            this.tasks.testing = tasks.filter((task: ITask) => task.state === 'testing');
            this.tasks.done = tasks.filter((task: ITask) => task.state === 'done');
        });

        this.auth.current$.subscribe((user) => {
            if (user) {
                this.username = user.name;
            }
        });
    }

    onDeleteTask(task: ITask): void {
        this.tasksService.deleteTask(task);
    }

    onMoveInSprint(task: ITask): void {
        let updatedTask = Object.assign({}, task, {
            state: 'sprint'
        });

        this.tasksService.updateTask(updatedTask);
    }

    onMoveInDone(task: ITask): void {
        let updatedTask = Object.assign({}, task, {
            state: 'done'
        });

        this.tasksService.updateTask(updatedTask);
    }

    onMoveInTesting(task: ITask): void {
        let updatedTask = Object.assign({}, task, {
            state: 'testing'
        });

        this.tasksService.updateTask(updatedTask);
    }

    onMoveInTodo(task: ITask): void {
        let updatedTask = Object.assign({}, task, {
            state: 'todo'
        });

        this.tasksService.updateTask(updatedTask);
    }

    onFilterTasks(filterName: string): void {
        this.currentFilter = filterName;

        this.tasksService.filterTasks(filterName);
    }

    showSection(sectionName: string): boolean {
        return this.currentFilter === ALL_FILTER || this.currentFilter === sectionName;
    }
}