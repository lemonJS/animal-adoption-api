'use strict';

const moment = require('moment');

class Formatting {
  static format(type, animal) {

    const dob = moment(animal.dateOfBirth);
    const now = moment();
    const diff = moment.duration(now.diff(dob));

    return {
      type,
      fullName: `${animal.forename} ${animal.surname}`,
      image: animal.image,
      age: {
        years: diff.years(),
        months: diff.months()
      }
    }
  }
}

module.exports = Formatting;