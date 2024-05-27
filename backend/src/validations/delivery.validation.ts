import Joi from 'joi';
import { BookingSource } from '@prisma/client';

const createDelivery = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    customerName: Joi.string().required(),
    mobileNo: Joi.string().required(),
    carPlateNo: Joi.string().required(),
    deliveryLat: Joi.number().required(),
    deliveryLng: Joi.number().required(),
    source: Joi.string().valid(...Object.values(BookingSource)).required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().optional(),
  }),
};

const getDeliveries = {
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

const getDelivery = {
  params: Joi.object().keys({
    deliveryId: Joi.number().integer(),
  }),
};

const updateDelivery = {
  params: Joi.object().keys({
    deliveryId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    customerName: Joi.string().optional(),
    mobileNo: Joi.string().optional(),
    carPlateNo: Joi.string().optional(),
    deliveryLat: Joi.number().optional(),
    deliveryLng: Joi.number().optional(),
    source: Joi.string().valid(...Object.values(BookingSource)).optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
  }),
};

const deleteDelivery = {
  params: Joi.object().keys({
    deliveryId: Joi.number().integer(),
  }),
};

export default{
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
};
