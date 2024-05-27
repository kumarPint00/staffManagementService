import Joi from 'joi';
import { BookingSource } from '@prisma/client';

const createCollection = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    customerName: Joi.string().required(),
    mobileNo: Joi.string().required(),
    carPlateNo: Joi.string().required(),
    collectionLat: Joi.number().required(),
    collectionLng: Joi.number().required(),
    source: Joi.string().valid(...Object.values(BookingSource)).required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().optional(),
  }),
};

const getCollections = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    customerName: Joi.string(),
    mobileNo: Joi.string(),
    carPlateNo: Joi.string(),
    source: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCollection = {
  params: Joi.object().keys({
    collectionId: Joi.number().integer(),
  }),
};

const updateCollection = {
  params: Joi.object().keys({
    collectionId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    customerName: Joi.string().optional(),
    mobileNo: Joi.string().optional(),
    carPlateNo: Joi.string().optional(),
    collectionLat: Joi.number().optional(),
    collectionLng: Joi.number().optional(),
    source: Joi.string().valid(...Object.values(BookingSource)).optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
  }),
};

const deleteCollection = {
  params: Joi.object().keys({
    collectionId: Joi.number().integer(),
  }),
};

export default {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
};
