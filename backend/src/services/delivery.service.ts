import { PrismaClient, Delivery } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createDelivery = async (data: any): Promise<Delivery> => {
  return prisma.delivery.create({
    data,
  });
};

const queryDeliveries = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<Delivery[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.delivery.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getDeliveryById = async (id: number): Promise<Delivery | null> => {
  return prisma.delivery.findUnique({
    where: { id },
  });
};

const updateDeliveryById = async (id: number, updateBody: any): Promise<Delivery> => {
  const delivery = await getDeliveryById(id);
  if (!delivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery not found');
  }
  return prisma.delivery.update({
    where: { id },
    data: updateBody,
  });
};

const deleteDeliveryById = async (id: number): Promise<Delivery> => {
  const delivery = await getDeliveryById(id);
  if (!delivery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery not found');
  }
  return prisma.delivery.delete({
    where: { id },
  });
};

export default {
  createDelivery,
  queryDeliveries,
  getDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
};
