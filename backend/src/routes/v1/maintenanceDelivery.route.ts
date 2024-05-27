import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { maintenanceDeliveryValidation } from '../../validations';
import { maintenanceDeliveryController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageMaintenanceDeliveries'), validate(maintenanceDeliveryValidation.createMaintenanceDelivery), maintenanceDeliveryController.createMaintenanceDelivery)
  .get(auth('getMaintenanceDeliveries'), validate(maintenanceDeliveryValidation.getMaintenanceDeliveries), maintenanceDeliveryController.getMaintenanceDeliveries);

router
  .route('/:maintenanceDeliveryId')
  .get(auth('getMaintenanceDeliveries'), validate(maintenanceDeliveryValidation.getMaintenanceDelivery), maintenanceDeliveryController.getMaintenanceDelivery)
  .patch(auth('manageMaintenanceDeliveries'), validate(maintenanceDeliveryValidation.updateMaintenanceDelivery), maintenanceDeliveryController.updateMaintenanceDelivery)
  .delete(auth('manageMaintenanceDeliveries'), validate(maintenanceDeliveryValidation.deleteMaintenanceDelivery), maintenanceDeliveryController.deleteMaintenanceDelivery);

export default router;
