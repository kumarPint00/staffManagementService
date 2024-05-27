import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { maintenanceCollectionValidation } from '../../validations';
import { maintenanceCollectionController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageMaintenanceCollections'), validate(maintenanceCollectionValidation.createMaintenanceCollection), maintenanceCollectionController.createMaintenanceCollection)
  .get(auth('getMaintenanceCollections'), validate(maintenanceCollectionValidation.getMaintenanceCollections), maintenanceCollectionController.getMaintenanceCollections);

router
  .route('/:maintenanceCollectionId')
  .get(auth('getMaintenanceCollections'), validate(maintenanceCollectionValidation.getMaintenanceCollection), maintenanceCollectionController.getMaintenanceCollection)
  .patch(auth('manageMaintenanceCollections'), validate(maintenanceCollectionValidation.updateMaintenanceCollection), maintenanceCollectionController.updateMaintenanceCollection)
  .delete(auth('manageMaintenanceCollections'), validate(maintenanceCollectionValidation.deleteMaintenanceCollection), maintenanceCollectionController.deleteMaintenanceCollection);

export default router;
