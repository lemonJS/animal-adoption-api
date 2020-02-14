'use strict';

const axios = require('axios');
const config = require('../../../src/config');
const Animals = require('../../../src/lib/animals');

describe('Animals', () => {
  describe('.types', () => {
    test('should return a list of valid types', () => {
      const expected = ['cats', 'dogs', 'hamsters'];

      expect(Animals.types).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('.get', () => {
    describe('when the provided type is not valid', () => {
      test('should throw an error', () => {
        const invalidType = 'teapot';

        expect(Animals.get(invalidType)).rejects.toThrow(`${invalidType} is an invalid animal type`);
      });
    });

    describe('when the provided type is valid', () => {
      const type = 'cats';
      const fakeResponse = ['animal_1', 'animal_2'];

      beforeEach(() => {
        axios.get = jest.fn(async () => ({
          data: fakeResponse
        }));
      });

      test('should call out to the upstream api', async () => {
        await Animals.get(type);

        expect(axios.get).toHaveBeenCalledWith(`${config.baseApiUri}/${type}`);
      });

      test('should return the data', async () => {
        const response = await Animals.get(type);

        expect(response).toEqual(fakeResponse);
      });

      describe('when the upstream api is not responding', () => {
        beforeEach(() => {
          axios.get = jest.fn(async () => { throw new Error() });
        });

        test('should return an empty array', async () => {
          expect(await Animals.get(type)).toEqual([]);
        });
      });
    });
  });
});