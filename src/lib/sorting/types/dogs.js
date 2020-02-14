'use strict';

const Base = require('../base');

class Dogs extends Base {
  sort() {
    return this.sortByAge('desc');
  }
}

module.exports = Dogs;