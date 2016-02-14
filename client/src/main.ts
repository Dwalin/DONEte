/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {API_PROVIDERS} from './app/tasks/services/api'
import {provideStore} from '@ngrx/store';
import {tasks} from './app/tasks/reducers/tasks';

require('./assets/css/style.styl');

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
// } else {
}
ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(App, [
        ...ENV_PROVIDERS,
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...API_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        provideStore({tasks})
    ])
        .catch(err => console.error(err));
});
