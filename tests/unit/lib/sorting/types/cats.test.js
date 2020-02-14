'use strict';

const Cats = require('../../../../../src/lib/sorting/types/cats');

describe('Cats', () => {
  test('should instantiate with a list of animals', () => {
    const fakeAnimals = ['animal_1', 'animal_2'];
    const cats = new Cats(fakeAnimals);

    expect(cats).toBeInstanceOf(Cats);
    expect(cats.animals).toEqual(fakeAnimals);
  });
});