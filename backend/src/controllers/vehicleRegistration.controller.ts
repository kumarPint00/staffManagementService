import { Request, Response } from 'express';
import httpStatus from 'http-status';
import vehicleRegistrationService from '../services/vehicleRegistration.service';

const createVehicleRegistration = async (req: Request, res: Response) => {
  const vehicleRegistration = await vehicleRegistrationService.createVehicleRegistration(req.body);
  res.status(httpStatus.CREATED).send(vehicleRegistration);
};

const getVehicleRegistrations = async (req: Request, res: Response) => {
  const filter = req.query;
  const options = {
    limit: parseInt(req.query.limit as string, 10) || 10,
    page: parseInt(req.query.page as string, 10) || 1,
  };
  const result = await vehicleRegistrationService.getVehicleRegistrations(filter, options);
  res.send(result);
};

const getVehicleRegistration = async (req: Request, res: Response) => {
  const vehicleRegistrationId = parseInt(req.params.vehicleRegistrationId, 10);
  const vehicleRegistration = await vehicleRegistrationService.getVehicleRegistration(vehicleRegistrationId);
  if (!vehicleRegistration) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Vehicle Registration not found' });
  } else {
    res.send(vehicleRegistration);
  }
};

const updateVehicleRegistration = async (req: Request, res: Response) => {
  const vehicleRegistrationId = parseInt(req.params.vehicleRegistrationId, 10);
  const vehicleRegistration = await vehicleRegistrationService.updateVehicleRegistration(vehicleRegistrationId, req.body);
  res.send(vehicleRegistration);
};

const deleteVehicleRegistration = async (req: Request, res: Response) => {
  const vehicleRegistrationId = parseInt(req.params.vehicleRegistrationId, 10);
  await vehicleRegistrationService.deleteVehicleRegistration(vehicleRegistrationId);
  res.status(httpStatus.NO_CONTENT).send();
};

export default {
  createVehicleRegistration,
  getVehicleRegistrations,
  getVehicleRegistration,
  updateVehicleRegistration,
  deleteVehicleRegistration,
};
