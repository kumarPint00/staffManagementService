import { PrismaClient, Dismissal } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createDismissal = async (data: any): Promise<Dismissal> => {
  return prisma.dismissal.create({
    data,
  });
};

const queryDismissals = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<Dismissal[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.dismissal.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getDismissalById = async (id: number): Promise<Dismissal | null> => {
  return prisma.dismissal.findUnique({
    where: { id },
  });
};

const updateDismissalById = async (id: number, updateBody: any): Promise<Dismissal> => {
  const dismissal = await getDismissalById(id);
  if (!dismissal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dismissal not found');
  }
  return prisma.dismissal.update({
    where: { id },
    data: updateBody,
  });
};

const deleteDismissalById = async (id: number): Promise<Dismissal> => {
  const dismissal = await getDismissalById(id);
  if (!dismissal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dismissal not found');
  }
  return prisma.dismissal.delete({
    where: { id },
  });
};

export default {
  createDismissal,
  queryDismissals,
  getDismissalById,
  updateDismissalById,
  deleteDismissalById,
};
