import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { collectionService } from '../services';

const createCollection = catchAsync(async (req, res) => {
  const collection = await collectionService.createCollection(req.body);
  res.status(httpStatus.CREATED).send(collection);
});

const getCollections = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'customerName', 'mobileNo', 'carPlateNo', 'source']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await collectionService.queryCollections(filter, options);
  res.send(result);
});

const getCollection = catchAsync(async (req, res) => {
  const collection = await collectionService.getCollectionById(req.params.collectionId);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }
  res.send(collection);
});

const updateCollection = catchAsync(async (req, res) => {
  const collection = await collectionService.updateCollectionById(req.params.collectionId, req.body);
  res.send(collection);
});

const deleteCollection = catchAsync(async (req, res) => {
  await collectionService.deleteCollectionById(req.params.collectionId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
};
