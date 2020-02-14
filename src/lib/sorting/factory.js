'use strict';

const Cats = require('./types/cats');
const Dogs = require('./types/dogs');
const Hamsters = require('./types/hamsters');

class Factory {
  /**
   * Return a new animal type from the factory
   * @public
   * @static
   * @param {enum} type One of the animal types
   * @param {array} animals A list of unsorted animals
   * @returns {array} The list of sorted animals
   */
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