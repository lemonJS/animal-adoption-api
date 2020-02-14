'use strict';

const Base = require('../../../../src/lib/sorting/base');

describe('Base', () => {
  test('should instantiate with a list of animals', () => {
    const fakeAnimals = ['animal_1', 'animal_2'];
    const base = new Base(fakeAnimals);

    expect(base).toBeInstanceOf(Base);
    expect(base.animals).toEqual(fakeAnimals);
  });
});