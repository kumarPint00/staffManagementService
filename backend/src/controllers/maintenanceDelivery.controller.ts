import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { maintenanceDeliveryService } from '../services';

const createMaintenanceDelivery = catchAsync(async (req, res) => {
  const maintenanceDelivery = await maintenanceDeliveryService.createMaintenanceDelivery(req.body);
  res.status(httpStatus.CREATED).send(maintenanceDelivery);
});

const getMaintenanceDeliveries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'carPlateNo', 'workshopName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await maintenanceDeliveryService.queryMaintenanceDeliveries(filter, options);
  res.send(result);
});

const getMaintenanceDelivery = catchAsync(async (req, res) => {
  const maintenanceDelivery = await maintenanceDeliveryService.getMaintenanceDeliveryById(req.params.maintenanceDeliveryId);
  if (!maintenanceDelivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance delivery not found');
  }
  res.send(maintenanceDelivery);
});

const updateMaintenanceDelivery = catchAsync(async (req, res) => {
  const maintenanceDelivery = await maintenanceDeliveryService.updateMaintenanceDeliveryById(req.params.maintenanceDeliveryId, req.body);
  res.send(maintenanceDelivery);
});

const deleteMaintenanceDelivery = catchAsync(async (req, res) => {
  await maintenanceDeliveryService.deleteMaintenanceDeliveryById(req.params.maintenanceDeliveryId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createMaintenanceDelivery,
  getMaintenanceDeliveries,
  getMaintenanceDelivery,
  updateMaintenanceDelivery,
  deleteMaintenanceDelivery,
};
