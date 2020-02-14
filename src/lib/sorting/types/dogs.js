'use strict';

const Base = require('../base');

module.exports = class Dogs extends Base {
  /**
   * Requirements:
   * - Dogs should be sorted by age (descending).
   */
  sort() {
    return this.sortByAge('desc');
  }
}