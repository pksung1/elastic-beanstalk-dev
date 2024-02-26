import { Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/user/service/user.service';
import { AuthException } from '../exceptions';
import { BaseUserDto } from 'src/domain/user/dto/base-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenRepository } from '../repository/auth-token.repository';
import { CreateAuthTokenDto } from '../dto/create-auth-token.dto';
import configuration from 'src/config/configuration';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/domain/user/dto/create-user.dto';
import {
  comparePassword,
  encryptPassword,
} from 'src/lib/security/bcrypto.util';
import { AuthToken } from '../dto/login-response.dto';
import { TokenRefreshRequestDto } from '../dto/token-refresh-request.dto';
import { BaseUserWithPasswordDto } from 'src/domain/user/dto/base-user-with-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authTokenRepository: AuthTokenRepository,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username, {
      password: true,
    });

    if (!user) {
      throw new AuthException('SIGN_IN_USER_NOT_FOUND');
    }

    if (user && comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    throw new AuthException('SIGN_IN_PASSWORD_NOT_MATCH');
  }

  async login(user: BaseUserDto) {
    return this.generateAuthToken(user);
  }

  async signUp(user: CreateUserDto) {
    user.password = await encryptPassword(user.password);
    return this.userService.create(user);
  }

  async refreshToken(request: TokenRefreshRequestDto) {
    const token = await this.authTokenRepository.findOneByRefreshToken(
      request.refreshToken,
    );

    if (!token) {
      throw new AuthException('REFRESH_TOKEN_NOT_FOUND');
    }

    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new AuthException('REFRESH_TOKEN_USER_NOT_FOUND');
    }

    return await this.generateAuthToken(user);
  }

  // User정보를 기반으로 JWT 토큰을 생성합니다.
  private async generateAuthToken(user: BaseUserDto): Promise<AuthToken> {
    const accessToken = this.jwtService.sign({
      username: user.username,
      role: user.roles,
      sub: user.id,
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      {
        expiresIn: configuration().jwt.refreshTokenExpiresIn,
      },
    );

    const registerToken = await this.authTokenRepository.registerToken(
      plainToClass(CreateAuthTokenDto, { userId: user.id, refreshToken }),
    );

    return plainToClass(AuthToken, {
      accessToken: accessToken,
      refreshToken: registerToken.refreshToken,
    });
  }
}
