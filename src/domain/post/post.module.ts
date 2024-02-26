import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { PostRepository } from './repository/post.repository';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService],
  exports: [PostService, PostRepository],
})
export class PostModule {}
