import { PrismaClient, Attendance } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

const createAttendance = async (data: any): Promise<Attendance> => {
  return prisma.attendance.create({
    data,
  });
};

const queryAttendances = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
): Promise<Attendance[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  return prisma.attendance.findMany({
    where: filter,
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
};

const getAttendanceById = async (id: number): Promise<Attendance | null> => {
  return prisma.attendance.findUnique({
    where: { id },
  });
};

const updateAttendanceById = async (id: number, updateBody: any): Promise<Attendance> => {
  const attendance = await getAttendanceById(id);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return prisma.attendance.update({
    where: { id },
    data: updateBody,
  });
};

const deleteAttendanceById = async (id: number): Promise<Attendance> => {
  const attendance = await getAttendanceById(id);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return prisma.attendance.delete({
    where: { id },
  });
};

export default {
  createAttendance,
  queryAttendances,
  getAttendanceById,
  updateAttendanceById,
  deleteAttendanceById,
};
