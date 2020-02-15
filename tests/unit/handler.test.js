'use strict';

const { Handler } = require('../../src/handler');
const Animals = require('../../src/lib/animals');
const Formatting = require('../../src/lib/formatting');
const SortingFactory = require('../../src/lib/sorting/factory');

describe('Handler', () => {
  describe('.getProcessedAnimal', () => {
    const handler = new Handler();
    const type = 'cat';
    const animals = ['cat_1', 'cat_2'];

    beforeEach(() => {
      Animals.get = jest.fn(async () => animals);
      SortingFactory.create = jest.fn(() => animals);
      Formatting.format = jest.fn();
    });

    test('should get the animal from the remote api', async () => {
      await handler.getProcessedAnimal(type);

      expect(Animals.get).toHaveBeenCalledWith(type);
    });

    test('should create an instance of the sorting factory', async () => {
      await handler.getProcessedAnimal(type);

      expect(SortingFactory.create).toHaveBeenCalledWith(type, animals);
    });

    test('should format the response', async () => {
      await handler.getProcessedAnimal(type);

      expect(Formatting.format).toHaveBeenCalledWith(type, animals[0]);
      expect(Formatting.format).toHaveBeenCalledWith(type, animals[1]);
    });
  });

  describe('.getAnimals', () => {
    const handler = new Handler();

    beforeEach(() => {
      handler.getProcessedAnimal = jest.fn(async () => ([1, 2, 3]));
    });

    test('should get all the animals and flatten them', async () => {
      const animals = await handler.getAnimals();

      expect(handler.getProcessedAnimal).toHaveBeenNthCalledWith(1, 'dogs');
      expect(handler.getProcessedAnimal).toHaveBeenNthCalledWith(2, 'cats');
      expect(handler.getProcessedAnimal).toHaveBeenNthCalledWith(3, 'hamsters');

      expect(animals).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    });
  });

  describe('.handleFailure', () => {
    test('should return a 500 status code with no body', () => {
      const handler = new Handler();

      expect(handler.handleFailure()).toEqual({
        statusCode: 500,
        body: null
      })
    });
  });

  describe('.handleSuccess', () => {
    test('should return a 200 status code with the stringified body', () => {
      const handler = new Handler();
      const body = { foo: 'bar' };

      expect(handler.handleSuccess(body)).toEqual({
        statusCode: 200,
        body: JSON.stringify(body)
      });
    });
  });

  describe('.process', () => {
    describe('when there is an empty response', () => {
      beforeEach(() => {
        Handler.prototype.handleFailure = jest.fn();
        Handler.prototype.handleSuccess = jest.fn();
        Handler.prototype.getAnimals = jest.fn(async () => ([]));
      });

      test('should handle the request as a failure', async () => {
        await Handler.process();

        expect(Handler.prototype.handleFailure).toHaveBeenCalled();
        expect(Handler.prototype.handleSuccess).not.toHaveBeenCalled();
      });
    });

    describe('when there is a partial, or full response', () => {
      beforeEach(() => {
        Handler.prototype.handleFailure = jest.fn();
        Handler.prototype.handleSuccess = jest.fn();
        Handler.prototype.getAnimals = jest.fn(async () => (['animal_1', 'animal_2']));
      });

      test('should handle the request as a success', async () => {
        await Handler.process();

        expect(Handler.prototype.handleSuccess).toHaveBeenCalled();
        expect(Handler.prototype.handleFailure).not.toHaveBeenCalled();
      });
    });
  });
});