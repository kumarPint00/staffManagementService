import { PrismaClient, Collection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createCollection = async (data: any): Promise<Collection> => {
  return prisma.collection.create({
    data,
  });
};

const queryCollections = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<Collection[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.collection.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getCollectionById = async (id: number): Promise<Collection | null> => {
  return prisma.collection.findUnique({
    where: { id },
  });
};

const updateCollectionById = async (id: number, updateBody: any): Promise<Collection> => {
  const collection = await getCollectionById(id);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }
  return prisma.collection.update({
    where: { id },
    data: updateBody,
  });
};

const deleteCollectionById = async (id: number): Promise<Collection> => {
  const collection = await getCollectionById(id);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }
  return prisma.collection.delete({
    where: { id },
  });
};

export  default {
  createCollection,
  queryCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
};
