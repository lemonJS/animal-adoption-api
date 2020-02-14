'use strict';

/**
 * This is an abstract class designed to be
 * extended by animal types from ./types/*
 * @abstract
 */
module.exports = class Base {
  constructor(animals) {
    this.animals = animals;
  }

  /**
   * Sort the animals by age
   * @param {'asc' | 'desc'} direction Whether to sort ascending or descending
   * @param {*} animals Optional argument of animals
   * @returns {array} The sorted list of animals
   */
  sortByAge(direction, animals=this.animals) {
    return animals.sort((a, b) => {
      return direction === 'asc'
        ? a > b
        : a < b;
    });
  }
}