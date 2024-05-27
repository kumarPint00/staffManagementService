import { PrismaClient, MaintenanceCollection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createMaintenanceCollection = async (data: any): Promise<MaintenanceCollection> => {
  return prisma.maintenanceCollection.create({
    data,
  });
};

const queryMaintenanceCollections = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<MaintenanceCollection[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.maintenanceCollection.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getMaintenanceCollectionById = async (id: number): Promise<MaintenanceCollection | null> => {
  return prisma.maintenanceCollection.findUnique({
    where: { id },
  });
};

const updateMaintenanceCollectionById = async (id: number, updateBody: any): Promise<MaintenanceCollection> => {
  const maintenanceCollection = await getMaintenanceCollectionById(id);
  if (!maintenanceCollection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance collection not found');
  }
  return prisma.maintenanceCollection.update({
    where: { id },
    data: updateBody,
  });
};

const deleteMaintenanceCollectionById = async (id: number): Promise<MaintenanceCollection> => {
  const maintenanceCollection = await getMaintenanceCollectionById(id);
  if (!maintenanceCollection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance collection not found');
  }
  return prisma.maintenanceCollection.delete({
    where: { id },
  });
};

export default {
  createMaintenanceCollection,
  queryMaintenanceCollections,
  getMaintenanceCollectionById,
  updateMaintenanceCollectionById,
  deleteMaintenanceCollectionById,
};
