'use server';
import { prisma, getSession } from '@/lib/auth';
import { type ApplicationInput, ApplicationSchema, type ApplicationStage } from '@/validators/application';

export async function getApplications() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return prisma.application.findMany({ take: 10, where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } });
}

export async function createApplication(application: ApplicationInput) {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const result = ApplicationSchema.safeParse(application);
  if (!result.success) {
    throw new Error('Invalid application data');
  }

  return prisma.application.create({
    data: { userId: session.user.id, ...result.data },
  });
}

export async function updateApplication(applicationId: string, application: ApplicationInput) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const result = ApplicationSchema.safeParse(application);
  if (!result.success) {
    throw new Error('Invalid application data');
  }

  return prisma.application.update({ data: { result }, where: { id: applicationId, userId: session.user.id } });
}

export async function deleteApplication(applicationId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return prisma.application.delete({ where: { id: applicationId, userId: session.user.id } });
}

export async function updateApplicationStage(applicationId: string, state: ApplicationStage) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return prisma.application.update({ data: { state: state }, where: { id: applicationId, userId: session.user.id } });
}
