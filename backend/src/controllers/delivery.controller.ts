import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { deliveryService } from '../services';

const createDelivery = catchAsync(async (req, res) => {
  const delivery = await deliveryService.createDelivery(req.body);
  res.status(httpStatus.CREATED).send(delivery);
});

const getDeliveries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'customerName', 'mobileNo', 'carPlateNo', 'source']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deliveryService.queryDeliveries(filter, options);
  res.send(result);
});

const getDelivery = catchAsync(async (req, res) => {
  const delivery = await deliveryService.getDeliveryById(req.params.deliveryId);
  if (!delivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery not found');
  }
  res.send(delivery);
});

const updateDelivery = catchAsync(async (req, res) => {
  const delivery = await deliveryService.updateDeliveryById(req.params.deliveryId, req.body);
  res.send(delivery);
});

const deleteDelivery = catchAsync(async (req, res) => {
  await deliveryService.deleteDeliveryById(req.params.deliveryId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
};
