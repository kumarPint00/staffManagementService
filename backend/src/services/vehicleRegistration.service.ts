import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const createVehicleRegistration = async (data: Prisma.VehicleRegistrationCreateInput) => {
  return prisma.vehicleRegistration.create({
    data,
  });
};

const getVehicleRegistrations = async (filter: any, options: any) => {
  const { limit, page } = options;
  return prisma.vehicleRegistration.findMany({
    where: filter,
    take: limit,
    skip: (page - 1) * limit,
  });
};

const getVehicleRegistration = async (vehicleRegistrationId: number) => {
  return prisma.vehicleRegistration.findUnique({
    where: { id: vehicleRegistrationId },
  });
};

const updateVehicleRegistration = async (vehicleRegistrationId: number, data: Prisma.VehicleRegistrationUpdateInput) => {
  return prisma.vehicleRegistration.update({
    where: { id: vehicleRegistrationId },
    data,
  });
};

const deleteVehicleRegistration = async (vehicleRegistrationId: number) => {
  return prisma.vehicleRegistration.delete({
    where: { id: vehicleRegistrationId },
  });
};

export default {
  createVehicleRegistration,
  getVehicleRegistrations,
  getVehicleRegistration,
  updateVehicleRegistration,
  deleteVehicleRegistration,
};
