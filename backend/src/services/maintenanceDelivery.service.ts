import { PrismaClient, MaintenanceDelivery } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createMaintenanceDelivery = async (data: any): Promise<MaintenanceDelivery> => {
  return prisma.maintenanceDelivery.create({
    data,
  });
};

const queryMaintenanceDeliveries = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<MaintenanceDelivery[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.maintenanceDelivery.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getMaintenanceDeliveryById = async (id: number): Promise<MaintenanceDelivery | null> => {
  return prisma.maintenanceDelivery.findUnique({
    where: { id },
  });
};

const updateMaintenanceDeliveryById = async (id: number, updateBody: any): Promise<MaintenanceDelivery> => {
  const maintenanceDelivery = await getMaintenanceDeliveryById(id);
  if (!maintenanceDelivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance delivery not found');
  }
  return prisma.maintenanceDelivery.update({
    where: { id },
    data: updateBody,
  });
};

const deleteMaintenanceDeliveryById = async (id: number): Promise<MaintenanceDelivery> => {
  const maintenanceDelivery = await getMaintenanceDeliveryById(id);
  if (!maintenanceDelivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance delivery not found');
  }
  return prisma.maintenanceDelivery.delete({
    where: { id },
  });
};

export default {
  createMaintenanceDelivery,
  queryMaintenanceDeliveries,
  getMaintenanceDeliveryById,
  updateMaintenanceDeliveryById,
  deleteMaintenanceDeliveryById,
};
