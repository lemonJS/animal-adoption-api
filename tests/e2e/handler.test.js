'use strict';

const axios = require('axios');
const { Handler } = require('../../src/handler');

const dogsFixture = require('../__fixtures__/dogs.json');
const catsFixture = require('../__fixtures__/cats.json');
const hamstersFixture = require('../__fixtures__/hamsters.json');

const partialResponse = require('../__fixtures__/response-partial.json');
const completeResponse = require('../__fixtures__/response-complete.json');

const axiosResponse = fixture => Promise.resolve({ data: { body: fixture } });
const axiosRejection = () => Promise.reject('API is poorly');

describe('handler', () => {
  describe('when all upsteam requests are successful', () => {
    beforeEach(() => {
      axios.get = jest
        .fn()
        .mockResolvedValueOnce(axiosResponse(dogsFixture))
        .mockResolvedValueOnce(axiosResponse(catsFixture))
        .mockResolvedValueOnce(axiosResponse(hamstersFixture));
    });

    test('should fetch, sort and format the response', async () => {
      const response = await Handler.process();

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(JSON.stringify(completeResponse));
    });
  });

  describe('when some of the upstream requests fail', () => {
    beforeEach(() => {
      axios.get = jest
        .fn()
        .mockResolvedValueOnce(axiosResponse(dogsFixture))
        .mockResolvedValueOnce(axiosRejection())
        .mockResolvedValueOnce(axiosResponse(hamstersFixture));
    });

    test('should fetch, sort and format the response with the data it has', async () => {
      const response = await Handler.process();

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(JSON.stringify(partialResponse));
    });
  });

  describe('when all of the upstream requests fail', () => {
    beforeEach(() => {
      axios.get = jest
        .fn()
        .mockResolvedValueOnce(axiosRejection())
        .mockResolvedValueOnce(axiosRejection())
        .mockResolvedValueOnce(axiosRejection());
    });

    test('should return an error with no body', async () => {
      const response = await Handler.process();

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(null);
    });
  });
});