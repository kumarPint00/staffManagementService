import Joi from 'joi';

const createDismissal = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    date: Joi.date().required(),
    dismissalTime: Joi.date().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
};

const getDismissals = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDismissal = {
  params: Joi.object().keys({
    dismissalId: Joi.number().integer(),
  }),
};

const updateDismissal = {
  params: Joi.object().keys({
    dismissalId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    date: Joi.date().optional(),
    dismissalTime: Joi.date().optional(),
    lat: Joi.number().optional(),
    lng: Joi.number().optional(),
  }),
};

const deleteDismissal = {
  params: Joi.object().keys({
    dismissalId: Joi.number().integer(),
  }),
};

export default {
  createDismissal,
  getDismissals,
  getDismissal,
  updateDismissal,
  deleteDismissal,
};
