'use strict';

const Base = require('../base');

class Cats extends Base {
  /**
   * Return a new array of animals where groups
   * with matching colors are removed
   * @private
   * @param {*} groups
   * @param {string[]} colors
   * @returns {array}
   */
  omitByColors(groups, colors) {
    const keys = Object.keys(groups);

    return keys.reduce((acc, key) => {
      // Don't include these keys
      if (colors.includes(key)) return acc;

      return [...acc, ...groups[key]];
    }, []);
  }

  /**
   * Requirements:
   * - Cats should be grouped by colour. Ginger cats should appear first,
   *   followed black cats, followed by any other colours.
   * - Each group of cats should be sorted by age (descending).
   *
   * @public
   * @returns {any[]} The sorted animals
   */
  sort() {
    const groups = this.animals.reduce((acc, animal) => {
      // Create a combined array of the existing animals
      // and this animal of the same color
      const group = [...acc[animal.color], animal]

      // Sort the group by age (note: makes use of the optional argument)
      acc[animal.color] = this.sortByAge('desc', group);

      return acc;
    }, {});

    return [
      ...groups.ginger,
      ...groups.black,
      ...this.omitByColors(groups, ['ginger', 'black'])
    ];
  }
}

module.exports = Cats;