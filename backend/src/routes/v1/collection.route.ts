import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { collectionValidation } from '../../validations';
import { collectionController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageCollections'), validate(collectionValidation.createCollection), collectionController.createCollection)
  .get(auth('getCollections'), validate(collectionValidation.getCollections), collectionController.getCollections);

router
  .route('/:collectionId')
  .get(auth('getCollections'), validate(collectionValidation.getCollection), collectionController.getCollection)
  .patch(auth('manageCollections'), validate(collectionValidation.updateCollection), collectionController.updateCollection)
  .delete(auth('manageCollections'), validate(collectionValidation.deleteCollection), collectionController.deleteCollection);

export default router;
