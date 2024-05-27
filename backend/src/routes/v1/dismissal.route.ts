import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { dismissalValidation } from '../../validations';
import { dismissalController } from '../../controllers/dismissal.controller';

const router = express.Router();

router
  .route('/')
  .post(auth('manageDismissals'), validate(dismissalValidation.createDismissal), dismissalController.createDismissal)
  .get(auth('getDismissals'), validate(dismissalValidation.getDismissals), dismissalController.getDismissals);

router
  .route('/:dismissalId')
  .get(auth('getDismissals'), validate(dismissalValidation.getDismissal), dismissalController.getDismissal)
  .patch(auth('manageDismissals'), validate(dismissalValidation.updateDismissal), dismissalController.updateDismissal)
  .delete(auth('manageDismissals'), validate(dismissalValidation.deleteDismissal), dismissalController.deleteDismissal);

export default router;
