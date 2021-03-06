import {Component} from 'angular2/core';

import {TaskListContainer} from './containers/TaskListContainer';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'app'
    selector: 'home',  // <tasks></tasks>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        TaskListContainer
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./tasks.css')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./tasks.html')
})
export class Tasks {
    // TypeScript public modifiers
    constructor() {
    }
}
