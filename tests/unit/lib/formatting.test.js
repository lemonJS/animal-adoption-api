'use strict';

const Formatting = require('../../../src/lib/formatting');

const fixtures = [
  {
    type: 'cats',
    fixture: require('../../__fixtures__/cats.json')
  },
  {
    type: 'dogs',
    fixture: require('../../__fixtures__/dogs.json')
  },
  {
    type: 'hamsters',
    fixture: require('../../__fixtures__/hamsters.json')
  }
];

describe('Formatting', () => {
  describe('.format', () => {
    // Loop over all fixtures
    fixtures.forEach(({ type, fixture }) => {

      // Loop over all results in the fixture
      fixture.forEach(fix => {
        const response = Formatting.format(type, fix);

        test('should have the correct keys', () => {
          expect(Object.keys(response)).toEqual(['type', 'fullName', 'image', 'age']);
        });

        test('should have an image object with a url', () => {
          expect(response.image.url).toBeTruthy();
        });

        test('should have an age object with years and months', () => {
          expect(typeof response.age.years).toEqual('number');
          expect(typeof response.age.months).toEqual('number');
        });

        test('should not have an obscure month', () => {
          expect(response.age.months).toBeLessThan(12);
        });
      });
    });
  });
});