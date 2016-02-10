import {Component, Output, Input, EventEmitter} from 'angular2/core';

import {FilterItem} from '../FilterItem/FilterItem';
import {ITasks} from '../../../models/ITasks';
import {ITask} from '../../../models/ITask';
import {Observable} from 'rxjs/Observable';

interface ICounters {
    all: number;
    todo: number;
    sprint: number;
    testing: number;
    done: number;
}

@Component({
    selector: 'task-filter',
    directives: [FilterItem],
    template: require('./TaskFilter.html')
})
export class TaskFilter {
    @Input('tasks')
    tasks$: Observable<ITasks>;

    @Output()
    filter: EventEmitter<any> = new EventEmitter(false);

    counters: ICounters = {all: 0, todo: 0, sprint: 0, testing: 0, done: 0};
    currentFilter: string = 'all';

    constructor() {
    }

    ngOnInit() {
        this.tasks$.subscribe((tasks: ITask[]) => {
            this.counters.all = tasks.length;
            this.counters.todo = tasks.filter((task: ITask) => task.state === 'todo').length;
            this.counters.sprint = tasks.filter((task: ITask) => task.state === 'sprint').length;
            this.counters.testing = tasks.filter((task: ITask) => task.state === 'testing').length;
            this.counters.done = tasks.filter((task: ITask) => task.state === 'done').length;
        });
    }

    isActive(filterName: string): boolean{
        return filterName === this.currentFilter;
    }

    onClickFilter(filterName) {
        this.currentFilter = filterName;
        this.filter.emit(filterName);
    }
}
