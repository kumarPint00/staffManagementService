import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import  dismissalService  from '../services/dismissal.service';

const createDismissal = catchAsync(async (req, res) => {
  const dismissal = await dismissalService.createDismissal(req.body);
  res.status(httpStatus.CREATED).send(dismissal);
});

const getDismissals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'date']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dismissalService.queryDismissals(filter, options);
  res.send(result);
});

const getDismissal = catchAsync(async (req, res) => {
  const dismissal = await dismissalService.getDismissalById(req.params.dismissalId);
  if (!dismissal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dismissal not found');
  }
  res.send(dismissal);
});

const updateDismissal = catchAsync(async (req, res) => {
  const dismissal = await dismissalService.updateDismissalById(req.params.dismissalId, req.body);
  res.send(dismissal);
});

const deleteDismissal = catchAsync(async (req, res) => {
  await dismissalService.deleteDismissalById(req.params.dismissalId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createDismissal,
  getDismissals,
  getDismissal,
  updateDismissal,
  deleteDismissal,
};
