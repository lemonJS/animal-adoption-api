'use strict';

const Base = require('../base');

class Cats extends Base {
  omitByColours(groups, colours) {
    const keys = Object.keys(groups || {});

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
      acc[animal.colour] = [...acc[animal.colour] || [], animal];

      return acc;
    }, {});

    return [
      ...this.sortByAge('desc', groups.ginger || []),
      ...this.sortByAge('desc', groups.black || []),
      ...this.sortByAge('desc', this.omitByColours(groups, ['ginger', 'black']))
    ];
  }
}

module.exports = Cats;