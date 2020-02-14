'use strict';

const Animals = require('./lib/animals');
const Formatting = require('./lib/formatting');
const SortingFactory = require('./lib/sorting/factory');

class Handler {
  async getProcessedAnimal(type) {
    const animals = await Animals.get(type);
    const factory = SortingFactory.create(type, animals);

    return factory
      .sort()
      .map(animal => Formatting.format(type, animal));
  }

  async getAnimals() {
    const response = Animals.types.map(this.getProcessedAnimal);
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

  static async process() {
    const handler = new Handler();
    const animals = await handler.getAnimals();

    // If all of the results fail then return a 500,
    // otherwise return the full/partial response
    return animals.length === 0
      ? handler.handleFailure()
      : handler.handleSuccess(animals);
  }
}

module.exports.animals = Handler.process;
