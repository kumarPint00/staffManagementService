import Joi from 'joi';

const createAttendance = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    date: Joi.date().required(),
    checkIn: Joi.date().required(),
    checkInLat: Joi.number().required(),
    checkInLng: Joi.number().required(),
    checkOut: Joi.date().optional(),
    checkOutLat: Joi.number().optional(),
    checkOutLng: Joi.number().optional(),
  }),
};

const getAttendances = {
  query: Joi.object().keys({
    userId: Joi.number().integer(),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAttendance = {
  params: Joi.object().keys({
    attendanceId: Joi.number().integer(),
  }),
};

const updateAttendance = {
  params: Joi.object().keys({
    attendanceId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    date: Joi.date().optional(),
    checkIn: Joi.date().optional(),
    checkInLat: Joi.number().optional(),
    checkInLng: Joi.number().optional(),
    checkOut: Joi.date().optional(),
    checkOutLat: Joi.number().optional(),
    checkOutLng: Joi.number().optional(),
  }),
};

const deleteAttendance = {
  params: Joi.object().keys({
    attendanceId: Joi.number().integer(),
  }),
};

export default  {
  createAttendance,
  getAttendances,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};
