import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginatedParams } from 'src/lib/pagination/pagination.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UserRepository } from '../repository/user.repository';
import { BaseUserDto } from '../dto/base-user.dto';
import { BaseUserWithPasswordDto } from '../dto/base-user-with-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll({
    meta,
    filter,
  }: { meta?: PaginatedParams; filter?: FilterUserDto } = {}) {
    return this.userRepository.findAll({ meta, filter });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findOneByUsername(
    username: string,
    { password }: { password?: boolean } = {},
  ) {
    if (password) {
      return await this.userRepository.findOneByUsernameWithPassword(username);
    }
    return await this.userRepository.findOneByUsername(username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
