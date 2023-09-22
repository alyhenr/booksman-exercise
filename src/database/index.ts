import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;
export async function connectDb(): Promise<void> {
  if (prisma) {
    return;
  }

  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
