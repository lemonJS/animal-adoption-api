'use strict';

const Base = require('../base');

class Hamsters extends Base {
  /**
   * Requirements:
   * - Hamsters should be sorted by age (ascending).
   *
   * @public
   * @returns {any[]} The sorted animals
   */
  sort() {
    return this.sortByAge('asc');
  }
}

module.exports = Hamsters;