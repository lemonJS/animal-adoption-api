'use strict';

class Base {
  constructor(animals) {
    this.animals = animals;
  }

  getAge(dateOfBirth) {
    const date = new Date(dateOfBirth);
    return date.valueOf();
  }

  sortByAge(direction, animals=this.animals) {
    return animals.sort((a, b) => {
      const dateA = this.getAge(a.dateOfBirth);
      const dateB = this.getAge(b.dateOfBirth);

      return direction === 'asc'
        ? dateB - dateA
        : dateA - dateB;
    });
  }
}

module.exports = Base;