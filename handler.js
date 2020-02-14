'use strict';

const Animals = require('./src/lib/animals');
const SortingFactory = require('./src/lib/sorting/factory');

class Handler {
  constructor(event) {
    this.event = event;
  }

  /**
   * Get a list of sorted animals by type
   * @private
   * @param {emum} type One of the animal types
   * @returns {Promise<array>} The sorted list of animals
   */
  async getSortedAnimal(type) {
    const animals = await Animals.get(type);
    const factory = SortingFactory.create(type, animals);

    return factory.sort();
  }

  /**
   * Get all the available animals that are up for adoption
   * @private
   * @returns {Promise<array>} The combined list of all animals
   */
  async getAnimals() {
    const response = Animals.types.map(this.getSortedAnimal);
    const animals = await Promise.all(response);

    // Flatten the list of promise results;
    return animals.reduce((acc, animal) => [...acc, ...animal], []);
  }

  /**
   * Handle failure
   * @private
   * @returns {*} A failure response
   */
  handleFailure() {
    return {
      statusCode: 500,
      body: null
    };
  }

  /**
   * Handle success
   * @private
   * @param {array} animals The list of processed animals
   * @returns {*} A success response
   */
  handleSuccess(animals) {
    return {
      statusCode: 200,
      body: JSON.stringify(animals)
    };
  }

  /**
   * The lambda handler function
   * @public
   * @static
   * @param {*} event Lambda event
   * @returns {Promise<any>} The lambda response
   */
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
