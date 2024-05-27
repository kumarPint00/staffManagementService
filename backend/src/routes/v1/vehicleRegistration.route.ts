import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { vehicleRegistrationValidation } from '../../validations';
import { vehicleRegistrationController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageVehicleRegistrations'), validate(vehicleRegistrationValidation.createVehicleRegistration), vehicleRegistrationController.createVehicleRegistration)
  .get(auth('getVehicleRegistrations'), validate(vehicleRegistrationValidation.getVehicleRegistrations), vehicleRegistrationController.getVehicleRegistrations);

router
  .route('/:vehicleRegistrationId')
  .get(auth('getVehicleRegistrations'), validate(vehicleRegistrationValidation.getVehicleRegistration), vehicleRegistrationController.getVehicleRegistration)
  .patch(auth('manageVehicleRegistrations'), validate(vehicleRegistrationValidation.updateVehicleRegistration), vehicleRegistrationController.updateVehicleRegistration)
  .delete(auth('manageVehicleRegistrations'), validate(vehicleRegistrationValidation.deleteVehicleRegistration), vehicleRegistrationController.deleteVehicleRegistration);

export default router;
