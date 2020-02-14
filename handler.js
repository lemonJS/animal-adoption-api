'use strict';

const Animals = require('./src/lib/animals');
const SortingFactory = require('./src/lib/sorting/factory');

class Handler {
  constructor(event) {
    this.event = event;
  }

  async getSortedAnimal(type) {
    const animals = await Animals.get(type);
    const factory = SortingFactory.create(type, animals);

    return factory.sort();
  }

  async getAnimals() {
    const response = Animals.types.map(this.getSortedAnimal);
    const animals = await Promise.all(response);

    // Flatten the list of promise results;
    return animals.reduce((acc, animal) => [...acc, ...animal], []);
  }

  handleFailure() {
    return {
      statusCode: 500,
      body: null
    };
  }

  handleSuccess(animals) {
    return {
      statusCode: 200,
      body: JSON.stringify(animals)
    };
  }

  static async process(event) {
    const handler = new Handler(event);

    const animals = await handler.getAnimals();

    // If all of the results fail then return a 500,
    // otherwise return the full/partial response
    return animals.length === 0
      ? handler.handleFailure()
      : handler.handleSuccess();
  }
}

module.exports.animals = Handler.process;
