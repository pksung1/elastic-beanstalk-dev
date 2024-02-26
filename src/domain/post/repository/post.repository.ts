import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { BasePostDto } from '../dto/base-post.dto';
import { FilterPostDto } from '../dto/filter-post.dto';
import { PaginatedWithFilter } from 'src/lib/pagination/pagination.dto';
import { toPaginationQuery } from 'src/lib/pagination/util/prisma.helper';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Paginated } from 'src/lib/pagination/Pagination';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePostDto) {
    const post = await this.prismaService.post.create({ data });

    return plainToClass(BasePostDto, post);
  }

  async findAll({ meta, filter }: PaginatedWithFilter<FilterPostDto> = {}) {
    const posts = await this.prismaService.post.findMany({
      where: instanceToPlain(filter),
      ...toPaginationQuery(meta),
    });

    const total = await this.prismaService.post.count();

    return new Paginated(
      posts.map((user) => plainToClass(BasePostDto, user)),
      {
        total: total,
        limit: meta?.limit,
        currentPage: meta?.page,
        hasNextPage:
          meta?.limit && meta?.page ? total > meta.limit * meta.page : false,
        hasPreviousPage: meta?.limit && meta?.page ? meta.page > 1 : false,
      },
    );
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    return plainToClass(BasePostDto, post);
  }

  async update(id: string, data: UpdatePostDto) {
    const post = await this.prismaService.post.update({
      where: { id },
      data: instanceToPlain(data),
    });
    return plainToClass(BasePostDto, post);
  }

  async remove(id: string) {
    const post = await this.prismaService.post.delete({ where: { id } });
    return plainToClass(BasePostDto, post);
  }
}
