'use strict';

const Factory = require('../../../../src/lib/sorting/factory');
const Cats = require('../../../../src/lib/sorting/types/cats');
const Dogs = require('../../../../src/lib/sorting/types/dogs');
const Hamsters = require('../../../../src/lib/sorting/types/hamsters');

describe('Factory', () => {
  test('should respond to cats', () => {
    const type = 'cats';

    expect(Factory.create(type)).toBeInstanceOf(Cats);
  });

  test('should response to dogs', () => {
    const type = 'dogs';

    expect(Factory.create(type)).toBeInstanceOf(Dogs);
  });

  test('should response to hamsters', () => {
    const type = 'hamsters';

    expect(Factory.create(type)).toBeInstanceOf(Hamsters);
  });

  test('should error if the type is not known', () => {
    const invalidType = 'teapot';

    expect(() => Factory.create(invalidType)).toThrow(`${invalidType} is not implimented`);
  });
});