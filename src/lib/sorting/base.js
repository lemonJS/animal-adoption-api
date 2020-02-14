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
}