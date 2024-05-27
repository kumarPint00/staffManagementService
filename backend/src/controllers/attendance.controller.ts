import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { attendanceService } from '../services';

const createAttendance = catchAsync(async (req, res) => {
  const attendance = await attendanceService.createAttendance(req.body);
  res.status(httpStatus.CREATED).send(attendance);
});

const getAttendances = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'date']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await attendanceService.queryAttendances(filter, options);
  res.send(result);
});

const getAttendance = catchAsync(async (req, res) => {
  const attendance = await attendanceService.getAttendanceById(req.params.attendanceId);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  res.send(attendance);
});

const updateAttendance = catchAsync(async (req, res) => {
  const attendance = await attendanceService.updateAttendanceById(req.params.attendanceId, req.body);
  res.send(attendance);
});

const deleteAttendance = catchAsync(async (req, res) => {
  await attendanceService.deleteAttendanceById(req.params.attendanceId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createAttendance,
  getAttendances,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};
