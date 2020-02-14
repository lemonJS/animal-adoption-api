'use strict';

const axios = require('axios');
const config = require('../config');

class Animals {
  static get types() {
    return ['dogs', 'cats', 'hamsters'];
  }

  static async get(type) {
    if (!Animals.types.includes(type)) {
      throw new Error(`${type} is an invalid animal type`);
    }

    try {
      const { data } = await axios.get(`${config.baseApiUri}/${type}`);
      return data.body;
    } catch(error) {
      // Depending on whether the error has been handled by axios
      console.error(error.response ? error.response.data : error);
      return [];
    }
  }
}

module.exports = Animals;