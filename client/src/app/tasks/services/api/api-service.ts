import {Injectable} from 'angular2/core';
import {Headers, Http, Request, RequestMethod, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {ITask} from '../../models/ITask';
import {API_TASKS_URL} from './constants';


interface TaskResponse {
    status: string;
    data: Array<{
        ITask;
        users: Array<{
            role: string;
            user: Object;
        }>
    }>;
}

interface IUser {
    role: string;
    user: Object;
}

@Injectable()
export class ApiService {
    constructor(private http: Http) {
    }

    createTask(body: any): Observable<ITask> {
        return this.request({
            body,
            method: RequestMethod.Post,
            url: API_TASKS_URL
        });
    }

    loadTasks(): Observable<ITask[]> {
        return this.request({
                method: RequestMethod.Get,
                url: API_TASKS_URL
            })
            .map((res) => {
                let tasks = res.data;

                tasks.forEach((task: ITask) => {
                    Object.assign(task, {
                        owner: task.users && task.users.filter((user: IUser) => user.role === 'creator')[0].user,
                        assignee: task.users && task.users.filter((user: IUser) => user.role === 'assignee')[0].user,
                        qa: task.users && task.users.filter((user: IUser) => user.role === 'tester')[0].user
                    });
                });

                return res;
            });
    }

    loadTask(taskId: string): Observable<ITask> {
        return this.request({
            method: RequestMethod.Get,
            url: `${API_TASKS_URL}/${taskId}`
        });
    }


    updateTask(task: ITask): Observable<ITask> {
        return this.request({
            body: task,
            method: RequestMethod.Put,
            url: `${API_TASKS_URL}/${task.id}`
        });
    }

    filterTasks(filterName: string): Observable<ITask> {
        return this.request({
            body: filterName,
            method: RequestMethod.Get,
            url: `${API_TASKS_URL}/state/${filterName}`
        });
    }

    deleteTask(taskId: string|number): Observable<ITask> {
        return this.request({
            method: RequestMethod.Delete,
            url: `${API_TASKS_URL}/${taskId}`
        });
    }

    request(options: any): Observable<any> {
        if (options.body) {
            if (typeof options.body !== 'string') {
                options.body = JSON.stringify(options.body);
            }

            options.headers = new Headers({
                'Content-Type': 'application/json'
            });
        }

        return this.http.request(new Request(options))
            .map((res: Response) => res.json());
    }
}
