import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma.service';

import { plainToClass } from 'class-transformer';
import { BaseAuthTokenDto } from '../dto/base-auth-token.dto';
import { CreateAuthTokenDto } from '../dto/create-auth-token.dto';
@Injectable()
export class AuthTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByRefreshToken(userId: string) {
    const token = this.prismaService.authToken.findFirst({
      where: {
        userId,
      },
    });

    if (!token) {
      return null;
    }

    return plainToClass(BaseAuthTokenDto, token);
  }

  async registerToken(token: CreateAuthTokenDto) {
    const newToken = await this.prismaService.authToken.upsert({
      where: {
        userId: token.userId,
      },
      create: {
        userId: token.userId,
        refreshToken: token.refreshToken,
      },
      update: {
        userId: token.userId,
        refreshToken: token.refreshToken,
      },
    });

    return plainToClass(BaseAuthTokenDto, newToken);
  }
}
