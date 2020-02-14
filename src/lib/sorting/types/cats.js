'use strict';

const Base = require('../base');

class Cats extends Base {
  omitByColours(groups, colours) {
    const keys = Object.keys(groups);

    return keys.reduce((acc, key) => {
      // Don't include these keys
      if (colours.includes(key)) return acc;

      return [...acc, ...groups[key]];
    }, []);
  }

  sort() {
    const groups = this.animals.reduce((acc, animal) => {
      // Create a combined array of the existing animals
      // and this animal of the same colour
      const group = [...acc[animal.colour] || [], animal];

      // Sort the group by age (note: makes use of the optional argument)
      acc[animal.colour] = this.sortByAge('desc', group);

      return acc;
    }, {});

    return [
      ...groups.ginger || [],
      ...groups.black || [],
      ...this.omitByColours(groups, ['ginger', 'black'])
    ];
  }
}

module.exports = Cats;