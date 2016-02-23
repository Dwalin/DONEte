/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Tasks} from './tasks/tasks';
import {Login} from './auth/login';

require('./app.styl');

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    providers: [...FORM_PROVIDERS],
    directives: [...ROUTER_DIRECTIVES, RouterActive],
    pipes: [],
    styles: [`
        nav ul {
          display: inline;
          list-style-type: none;
          margin: 0;
          padding: 0;
          width: 60px;
        }
        nav li {
          display: inline;
        }
        nav li.active {
          background-color: lightgray;
        }
    `],
    template: `
    <header class="done-header">
        Done.te — Small team task management
    </header>
    <div class="done-wrapper">
         <header>
          <nav>
            <ul>
              <li router-active>
                <a [routerLink]=" ['Index'] ">Index</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['Home'] ">Home</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['About'] ">About</a>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
  `
})
@RouteConfig([
    {path: '/', component: Tasks, name: 'Index'},
    {path: '/tasks', component: Tasks, name: 'Home'},
    {path: '/login', component: Login, name: 'Login'},

    // Async load a component using Webpack's require with es6-promise-loader
    {path: '/about', loader: () => require('./about/about')('About'), name: 'About'},
    {path: '/**', redirectTo: ['Index']}
])
export class App {
    constructor() {

    }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
