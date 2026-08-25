'use server';
import { prisma, getSession } from '@/lib/auth';
import {
  type ApplicationInput,
  ApplicationSchema,
  type ApplicationStage,
} from '@/validators/application';

export async function requireUser() {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session.user;
}

const pageCount = 10;
export async function getApplications() {
  const user = await requireUser();
  return prisma.application.findMany({
    take: pageCount,
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getApplicationById(applicationId: string) {
  const user = await requireUser();
  return prisma.application.findUnique({
    where: { id: applicationId, userId: user.id },
  });
}

const parseApplications = async (application: ApplicationInput) => {
  const result = ApplicationSchema.safeParse(application);
  if (!result.success) {
    throw new Error('Invalid application data');
  }
  return result;
};

export async function createApplication(application: ApplicationInput) {
  const user = await requireUser();
  const result = await parseApplications(application);
  return prisma.application.create({
    data: { ...result.data, userId: user.id },
  });
}

export async function updateApplication(
  applicationId: string,
  application: ApplicationInput,
) {
  const user = await requireUser();
  const result = await parseApplications(application);
  return prisma.application.update({
    data: result.data,
    where: { id: applicationId, userId: user.id },
  });
}

export async function deleteApplication(applicationId: string) {
  const user = await requireUser();
  return prisma.application.delete({
    where: { id: applicationId, userId: user.id },
  });
}

export async function updateApplicationStage(
  applicationId: string,
  state: ApplicationStage,
) {
  const user = await requireUser();
  return prisma.application.update({
    data: { state: state },
    where: { id: applicationId, userId: user.id },
  });
}
