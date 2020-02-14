'use strict';

const factory = require('../../../../src/lib/sorting/factory');
const Cats = require('../../../../src/lib/sorting/types/cats');
const Dogs = require('../../../../src/lib/sorting/types/dogs');
const Hamsters = require('../../../../src/lib/sorting/types/hamsters');

describe('factory', () => {
  test('should respond to cats', () => {
    const type = 'cats';

    expect(factory(type)).toBeInstanceOf(Cats);
  });

  test('should response to dogs', () => {
    const type = 'dogs';

    expect(factory(type)).toBeInstanceOf(Dogs);
  });

  test('should response to hamsters', () => {
    const type = 'hamsters';

    expect(factory(type)).toBeInstanceOf(Hamsters);
  });

  test('should error if the type is not known', () => {
    const invalidType = 'teapot';

    expect(() => factory(invalidType)).toThrow(`${invalidType} is not implimented`);
  });
});