// External Dependencies
const boom = require('boom');
const logger = require('../helpers/logger');

// Get Data Models
const Car = require('../models/Car');
const utils = require('../helpers/utils');

// Get all cars
exports.getCars = async (req, reply) => {
  try {
    const cars = await Car.find();
    return cars;
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    return car;
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};

// Add a new car
exports.addCar = async (req, reply) => {
  try {
    const carData = req.body;
    carData.tags = utils.transformArrayToString(',', carData.tags);

    const car = new Car(carData);
    const addedCar = await car.save();
    logger.info({
      operation: 'addNewCar',
      message: `added new car ${addedCar.title}`,
    });
    return addedCar;
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};

// Update an existing car
exports.updateCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const carData = req.body;
    carData.tags = utils.transformArrayToString(',', carData.tags);

    const updateData = { ...carData };
    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
    logger.info({
      operation: 'updateExistingCar',
      message: `updated existing car: ${id}`,
    });
    return updatedCar;
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id;
    const car = await Car.findByIdAndRemove(id);
    logger.info({
      operation: 'deleteCar',
      message: `deleted car: ${id}`,
    });
    return car;
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};
