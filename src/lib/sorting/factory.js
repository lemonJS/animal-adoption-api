'use strict';

const Cats = require('./types/cats');
const Dogs = require('./types/dogs');
const Hamsters = require('./types/hamsters');

class Factory {
  static create(type, animals) {
    switch(type) {
      case 'cats':
        return new Cats(animals);
      case 'dogs':
        return new Dogs(animals);
      case 'hamsters':
        return new Hamsters(animals);
      default:
        throw new Error(`${type} is not implimented`);
    }
  }
}

module.exports = Factory;