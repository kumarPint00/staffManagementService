import Joi from 'joi';

const createMaintenanceCollection = {
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

const getMaintenanceCollections = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    carPlateNo: Joi.string(),
    workshopName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMaintenanceCollection = {
  params: Joi.object().keys({
    maintenanceCollectionId: Joi.number().integer(),
  }),
};

const updateMaintenanceCollection = {
  params: Joi.object().keys({
    maintenanceCollectionId: Joi.number().integer(),
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

const deleteMaintenanceCollection = {
  params: Joi.object().keys({
    maintenanceCollectionId: Joi.number().integer(),
  }),
};

export default {
  createMaintenanceCollection,
  getMaintenanceCollections,
  getMaintenanceCollection,
  updateMaintenanceCollection,
  deleteMaintenanceCollection,
};
