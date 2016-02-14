import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';
import {Tasks} from '../../models/Tasks';


@Component({
    selector: 'add-task-form',
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder, Tasks],
    template: require('./AddTaskForm.html')
})
export default class AddTaskForm {
    private taskForm;

    constructor(public builder: FormBuilder, public tasks: Tasks) {
        this.taskForm = builder.group({
            task: ['', Validators.required],
            description: ['', Validators.required],
            ticket: ['']
        });
    }

    createNewTask(event){
        event.preventDefault();

        const task = this.taskForm.value;
        task.state = 'todo';
        this.tasks.addTask(task);
    }
}