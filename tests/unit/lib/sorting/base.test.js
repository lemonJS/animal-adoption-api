'use strict';

const Base = require('../../../../src/lib/sorting/base');

describe('Base', () => {
  const fakeAnimals = [
    { dateOfBirth: '2009-02-13' },
    { dateOfBirth: '2011-09-30' }
  ];

  test('should instantiate with a list of animals', () => {
    const base = new Base(fakeAnimals);

    expect(base).toBeInstanceOf(Base);
    expect(base.animals).toEqual(fakeAnimals);
  });

  describe('.getAge', () => {
    const base = new Base(fakeAnimals);

    test('should convert a date string to an epoch', () => {
      const dateString = '2020-02-14';
      const age = base.getAge(dateString);

      expect(typeof age).toEqual('number');
      expect(age).toEqual(1581638400000);
    });
  });

  describe('.sortByAge', () => {
    test('should sort the animals by age ascending', () => {
      const base = new Base(fakeAnimals);
      const sorted = base.sortByAge('asc');

      expect(sorted[0].dateOfBirth).toEqual('2011-09-30');
      expect(sorted[1].dateOfBirth).toEqual('2009-02-13');
    });

    test('should sort the animals by age descending', () => {
      const base = new Base(fakeAnimals);
      const sorted = base.sortByAge('desc');

      expect(sorted[0].dateOfBirth).toEqual('2009-02-13');
      expect(sorted[1].dateOfBirth).toEqual('2011-09-30');
    });

    describe('when a second argument of animals is given', () => {
      test('should override the instance variable', () => {
        const base = new Base(fakeAnimals);
        const sorted = base.sortByAge('asc', []);

        expect(sorted).toEqual([]);
      });
    });
  });
});