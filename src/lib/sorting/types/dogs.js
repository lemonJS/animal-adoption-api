'use strict';

const Base = require('../base');

class Dogs extends Base {
  /**
   * Requirements:
   * - Dogs should be sorted by age (descending).
   *
   * @public
   * @returns {any[]} The sorted animals
   */
  sort() {
    return this.sortByAge('desc');
  }
}

module.exports = Dogs;