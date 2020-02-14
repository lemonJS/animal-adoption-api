'use strict';

const Dogs = require('../../../../../src/lib/sorting/types/dogs');

describe('Dogs', () => {
  test('should instantiate with a list of animals', () => {
    const fakeAnimals = ['animal_1', 'animal_2'];
    const dogs = new Dogs(fakeAnimals);

    expect(dogs).toBeInstanceOf(Dogs);
    expect(dogs.animals).toEqual(fakeAnimals);
  });
});