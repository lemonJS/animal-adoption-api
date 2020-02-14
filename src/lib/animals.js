'use strict';

const axios = require('axios');
const config = require('../config');

module.exports = class Animals {
  /**
   * List of available animal types
   * @public
   * @returns {string[]} A list of types
   */
  static get types() {
    return ['cats', 'dogs', 'hamsters'];
  }

  /**
   * Get a list of animals for a given type
   * @public
   * @param {enum} type One of the valid animal types
   * @returns {array} An array of animals
   */
  static async get(type) {
    if (!Animals.types.includes(type)) {
      throw new Error(`${type} is an invalid animal type`);
    }

    try {
      const { data } = await axios.get(`${config.baseApiUri}/${type}`);
      return data;
    } catch(error) {
      console.error(error);
      return [];
    }
  }
}