import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { PostModule } from './domain/post/post.module';
import { UserModule } from './domain/user/user.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './domain/auth/strategy/jwt/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/.env.local'],
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
