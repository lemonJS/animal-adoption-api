'use strict';

const config = require('../../src/config');

describe('Config', () => {
  test('should export a url for the api', () => {
    expect(config.hasOwnProperty('baseApiUri')).toEqual(true);
  });
});