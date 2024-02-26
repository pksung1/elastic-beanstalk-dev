import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import configuration from 'src/config/configuration';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { AuthTokenRepository } from './repository/auth-token.repository';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthTokenRepository,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
