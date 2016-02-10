import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {Tasks} from './tasks';

describe('Tasks', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Tasks
  ]);

  it('should have default data', inject([ Tasks ], (Tasks) => {
    expect(Tasks.data).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Tasks ], (Tasks) => {
    expect(!!Tasks.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Tasks ], (Tasks) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    Tasks.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
