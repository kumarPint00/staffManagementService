import Joi from 'joi';

const createVehicleRegistration = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    vehicleNumber: Joi.string().required(),
    registrationStatus: Joi.string().required(),
    registrationDate: Joi.date().required(),
    expiryDate: Joi.date().required(),
  }),
};

const getVehicleRegistrations = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    vehicleNumber: Joi.string(),
    registrationStatus: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVehicleRegistration = {
  params: Joi.object().keys({
    vehicleRegistrationId: Joi.number().integer(),
  }),
};

const updateVehicleRegistration = {
  params: Joi.object().keys({
    vehicleRegistrationId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    vehicleNumber: Joi.string().optional(),
    registrationStatus: Joi.string().optional(),
    registrationDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
  }),
};

const deleteVehicleRegistration = {
  params: Joi.object().keys({
    vehicleRegistrationId: Joi.number().integer(),
  }),
};

export default {
  createVehicleRegistration,
  getVehicleRegistrations,
  getVehicleRegistration,
  updateVehicleRegistration,
  deleteVehicleRegistration,
};
