import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
