'use strict';

const Hamsters = require('../../../../../src/lib/sorting/types/hamsters');

describe('Hamsters', () => {
  test('should instantiate with a list of animals', () => {
    const fakeAnimals = ['animal_1', 'animal_2'];
    const hamsters = new Hamsters(fakeAnimals);

    expect(hamsters).toBeInstanceOf(Hamsters);
    expect(hamsters.animals).toEqual(fakeAnimals);
  });

  describe('.sort', () => {
    const hamsters = new Hamsters([]);

    beforeEach(() => {
      hamsters.sortByAge = jest.fn();
    });

    test('should sort by ascending date', () => {
      hamsters.sort();

      expect(hamsters.sortByAge).toHaveBeenCalledWith('asc');
    });
  });
});