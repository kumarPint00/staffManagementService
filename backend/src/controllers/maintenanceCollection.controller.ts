import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { maintenanceCollectionService } from '../services';

const createMaintenanceCollection = catchAsync(async (req, res) => {
  const maintenanceCollection = await maintenanceCollectionService.createMaintenanceCollection(req.body);
  res.status(httpStatus.CREATED).send(maintenanceCollection);
});

const getMaintenanceCollections = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'carPlateNo', 'workshopName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await maintenanceCollectionService.queryMaintenanceCollections(filter, options);
  res.send(result);
});

const getMaintenanceCollection = catchAsync(async (req, res) => {
  const maintenanceCollection = await maintenanceCollectionService.getMaintenanceCollectionById(req.params.maintenanceCollectionId);
  if (!maintenanceCollection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance collection not found');
  }
  res.send(maintenanceCollection);
});

const updateMaintenanceCollection = catchAsync(async (req, res) => {
  const maintenanceCollection = await maintenanceCollectionService.updateMaintenanceCollectionById(req.params.maintenanceCollectionId, req.body);
  res.send(maintenanceCollection);
});

const deleteMaintenanceCollection = catchAsync(async (req, res) => {
  await maintenanceCollectionService.deleteMaintenanceCollectionById(req.params.maintenanceCollectionId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createMaintenanceCollection,
  getMaintenanceCollections,
  getMaintenanceCollection,
  updateMaintenanceCollection,
  deleteMaintenanceCollection,
};
