import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { BaseUserDto } from '../dto/base-user.dto';
import { plainToClass, instanceToPlain } from 'class-transformer';
import { Paginated } from 'src/lib/pagination/Pagination';
import { PaginatedWithFilter } from 'src/lib/pagination/pagination.dto';
import { toPaginationQuery } from 'src/lib/pagination/util/prisma.helper';
import { FilterUserDto } from '../dto/filter-user.dto';
import { BaseUserWithPasswordDto } from '../dto/base-user-with-password.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: createUserDto.toPrisma(),
    });
    return plainToClass(BaseUserDto, user);
  }

  async findAll({ meta, filter }: PaginatedWithFilter<FilterUserDto> = {}) {
    const users = await this.prismaService.user.findMany({
      where: instanceToPlain(filter),
      ...toPaginationQuery(meta),
    });

    const total = await this.prismaService.user.count();

    return new Paginated(
      users.map((user) => plainToClass(BaseUserDto, user)),
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

  async findOneByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return plainToClass(BaseUserDto, user);
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return plainToClass(BaseUserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: instanceToPlain(updateUserDto),
    });
    return plainToClass(BaseUserDto, user);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return plainToClass(BaseUserDto, user);
  }

  async findOneByUsernameWithPassword(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return plainToClass(BaseUserWithPasswordDto, user);
  }
}
