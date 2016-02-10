import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgIf} from 'angular2/common';


@Component({
    selector: 'filter-item',
    directives: [NgIf],
    template: require('./FilterItem.html')
})
export class FilterItem {
    @Input()
    name;

    @Input()
    count;

    @Input()
    text;

    @Output()
    filter: EventEmitter<any> = new EventEmitter(false);

    constructor() {
    }

    onClick(filterName) {
        this.filter.emit(filterName);
    }
}
