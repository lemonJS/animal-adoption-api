'use strict';

const Base = require('../base');

module.exports = class Hamsters extends Base {
  /**
   * Requirements:
   * - Hamsters should be sorted by age (ascending).
   */
  sort() {
    return this.sortByAge('asc');
  }
}