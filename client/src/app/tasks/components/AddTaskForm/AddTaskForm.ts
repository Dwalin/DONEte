import {Component, Injectable} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';
import {Tasks} from '../../models/Tasks';
import {ModalInstance} from '../../../core/modal/ModalInstance';
import ModalDecorator  from '../../../core/modal/Modal';


@ModalDecorator()
@Injectable()
@Component({
    template: `<div> Test directive</div>`,
    selector: 'test'
})
export class Test {
    constructor(modal: ModalInstance) {
        setInterval(() => {
            modal.close();
        }, 3000000);
    }

    open(){}
}

@Component({
    selector: 'add-task-form',
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder, Tasks, Test],
    template: require('./AddTaskForm.html')
})
export default class AddTaskForm {
    taskForm;
    taskModel = {
        state: 'todo',
        user: {}
    };

    constructor(public builder: FormBuilder, public tasks: Tasks, private modal: Test) {
        this.taskForm = builder.group({
            task: ['', Validators.required],
            description: ['', Validators.required],
            ticket: [''],
            assignee: ['']
        });
    }

    createNewTask(event) {
        this.modal.open();

        event.preventDefault();
        this.tasks.addTask(this.taskModel);
    }
}
