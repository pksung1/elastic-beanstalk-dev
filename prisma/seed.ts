/**
 * Prisma Seed 입니다
 */

import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../src/lib/security/bcrypto.util';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      nickname: 'user nick',
      email: 'user@user.com',
      password: await encryptPassword('user'),
      roles: ['USER'],
    },
  });

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      nickname: 'admin nick',
      email: 'admin@admin.com',
      password: await encryptPassword('admin'),
      roles: ['ADMIN'],
    },
  });
}

main();
