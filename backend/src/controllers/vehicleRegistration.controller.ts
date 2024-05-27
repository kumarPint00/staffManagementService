import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { vehicleRegistrationService } from '../services';

const createVehicleRegistration = catchAsync(async (req, res) => {
  const vehicleRegistration = await vehicleRegistrationService.createVehicleRegistration(req.body);
  res.status(httpStatus.CREATED).send(vehicleRegistration);
});

const getVehicleRegistrations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'vehicleNumber', 'registrationStatus']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await vehicleRegistrationService.queryVehicleRegistrations(filter, options);
  res.send(result);
});

const getVehicleRegistration = catchAsync(async (req, res) => {
  const vehicleRegistration = await vehicleRegistrationService.getVehicleRegistrationById(req.params.vehicleRegistrationId);
  if (!vehicleRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle registration not found');
  }
  res.send(vehicleRegistration);
});

const updateVehicleRegistration = catchAsync(async (req, res) => {
  const vehicleRegistration = await vehicleRegistrationService.updateVehicleRegistrationById(req.params.vehicleRegistrationId, req.body);
  res.send(vehicleRegistration);
});

const deleteVehicleRegistration = catchAsync(async (req, res) => {
  await vehicleRegistrationService.deleteVehicleRegistrationById(req.params.vehicleRegistrationId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createVehicleRegistration,
  getVehicleRegistrations,
  getVehicleRegistration,
  updateVehicleRegistration,
  deleteVehicleRegistration,
};
