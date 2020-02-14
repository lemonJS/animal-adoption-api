'use strict';

const Base = require('../base');

class Dogs extends Base {
  /**
   * Requirements:
   * - Dogs should be sorted by age (descending).
   */
  sort() {
    return this.sortByAge('desc');
  }
}

module.exports = Dogs;