import Joi from 'joi';

const createMaintenanceDelivery = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    carPlateNo: Joi.string().required(),
    carIssue: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().optional(),
    workInProgress: Joi.date().optional(),
    workshopName: Joi.string().required(),
    contactPerson: Joi.string().required(),
    workshopLat: Joi.number().required(),
    workshopLng: Joi.number().required(),
  }),
};

const getMaintenanceDeliveries = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    carPlateNo: Joi.string(),
    workshopName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMaintenanceDelivery = {
  params: Joi.object().keys({
    maintenanceDeliveryId: Joi.number().integer(),
  }),
};

const updateMaintenanceDelivery = {
  params: Joi.object().keys({
    maintenanceDeliveryId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    carPlateNo: Joi.string().optional(),
    carIssue: Joi.string().optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    workInProgress: Joi.date().optional(),
    workshopName: Joi.string().optional(),
    contactPerson: Joi.string().optional(),
    workshopLat: Joi.number().optional(),
    workshopLng: Joi.number().optional(),
  }),
};

const deleteMaintenanceDelivery = {
  params: Joi.object().keys({
    maintenanceDeliveryId: Joi.number().integer(),
  }),
};

export default {
  createMaintenanceDelivery,
  getMaintenanceDeliveries,
  getMaintenanceDelivery,
  updateMaintenanceDelivery,
  deleteMaintenanceDelivery,
};
