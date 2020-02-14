'use strict';

const Base = require('../base');

class Hamsters extends Base {
  sort() {
    return this.sortByAge('asc');
  }
}

module.exports = Hamsters;