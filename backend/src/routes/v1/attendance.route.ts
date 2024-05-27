import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { attendanceValidation } from '../../validations';
import { attendanceController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageAttendances'), validate(attendanceValidation.createAttendance), attendanceController.createAttendance)
  .get(auth('getAttendances'), validate(attendanceValidation.getAttendances), attendanceController.getAttendances);

router
  .route('/:attendanceId')
  .get(auth('getAttendances'), validate(attendanceValidation.getAttendance), attendanceController.getAttendance)
  .patch(auth('manageAttendances'), validate(attendanceValidation.updateAttendance), attendanceController.updateAttendance)
  .delete(auth('manageAttendances'), validate(attendanceValidation.deleteAttendance), attendanceController.deleteAttendance);

export default router;
