import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { deliveryValidation } from '../../validations';
import { deliveryController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageDeliveries'), validate(deliveryValidation.createDelivery), deliveryController.createDelivery)
  .get(auth('getDeliveries'), validate(deliveryValidation.getDeliveries), deliveryController.getDeliveries);

router
  .route('/:deliveryId')
  .get(auth('getDeliveries'), validate(deliveryValidation.getDelivery), deliveryController.getDelivery)
  .patch(auth('manageDeliveries'), validate(deliveryValidation.updateDelivery), deliveryController.updateDelivery)
  .delete(auth('manageDeliveries'), validate(deliveryValidation.deleteDelivery), deliveryController.deleteDelivery);

export default router;
