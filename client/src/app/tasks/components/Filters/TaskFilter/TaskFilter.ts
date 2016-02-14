import {Component, Output, Input, EventEmitter} from 'angular2/core';

import {FilterItem} from '../FilterItem/FilterItem';
import {IAmount} from '../../../models/ITasks';
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
    @Input('amount')
    amount$: Observable<IAmount>;

    @Output()
    filter: EventEmitter<any> = new EventEmitter(false);

    amount: IAmount = {all: 0, todo: 0, sprint: 0, testing: 0, done: 0};
    currentFilter: string = 'all';

    constructor() {
    }

    ngOnInit() {
        this.amount$.subscribe((amount: IAmount) => {
            this.amount = amount;
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
