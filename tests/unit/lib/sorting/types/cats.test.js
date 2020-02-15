'use strict';

const Cats = require('../../../../../src/lib/sorting/types/cats');
const fixture = require('../../../../__fixtures__/cats.json');

describe('Cats', () => {
  test('should instantiate with a list of animals', () => {
    const fakeAnimals = ['animal_1', 'animal_2'];
    const cats = new Cats(fakeAnimals);

    expect(cats).toBeInstanceOf(Cats);
    expect(cats.animals).toEqual(fakeAnimals);
  });

  describe('.omitByColours', () => {
    test('should remove the matching colours', () => {
      const cats = new Cats([]);

      const groups = {
        'ginger': ['ginger_cat'],
        'black': ['black_cat'],
        'grey': ['grey_cat']
      };

      expect(cats.omitByColours(groups, ['ginger'])).toEqual(['black_cat', 'grey_cat']);
      expect(cats.omitByColours(groups, ['black', 'grey'])).toEqual(['ginger_cat']);
      expect(cats.omitByColours(groups, [])).toEqual(['ginger_cat', 'black_cat', 'grey_cat']);
    });

    describe('if the group is empty', () => {
      test('should return an empty array', () => {
        const cats = new Cats([]);
        const groups = undefined;

        expect(cats.omitByColours(groups, ['ginger'])).toEqual([]);
      });
    });
  });

  describe('.sort', () => {
    test('should sort them in the specified colour order', () => {
      const cats = new Cats(fixture);
      const sort = cats.sort();

      expect(sort[0].colour).toEqual('ginger');
      expect(sort[1].colour).toEqual('ginger');
      expect(sort[2].colour).toEqual('ginger');
      expect(sort[3].colour).toEqual('black');
      expect(sort[4].colour).toEqual('black');
      expect(sort[5].colour).toEqual('gray');
      expect(sort[6].colour).toEqual('white');
    });

    test('should sort groups of colours by descending age', () => {
      const cats = new Cats(fixture);
      const sort = cats.sort();

      // [ ginger[], black[], rest[] ]
      const groups = [sort.slice(0, 3), sort.slice(3, 5), sort.slice(5)];

      groups.forEach(group => {
        // [ epoch, epoch, epoch ]
        const ages = group.map(animal => cats.getAge(animal.dateOfBirth));

        // Sort by decending
        const sorted = [...ages].sort((a, b) => a - b);
        // HACK: Compare the two arrays of numbers exactly
        expect(JSON.stringify(sorted)).toEqual(JSON.stringify(ages));
      });
    });
  });
});