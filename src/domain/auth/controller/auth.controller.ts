import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../strategy/local/local.guard';
import { LocalLoginDto } from '../strategy/local/local-login.dto';
import { CreateUserDto } from 'src/domain/user/dto/create-user.dto';
import { PUBLIC, Roles } from '../strategy/jwt/roles.decorator';
import { UserRole } from 'src/domain/user/constant/user';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(PUBLIC)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LocalLoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(UserRole.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(PUBLIC)
  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }
}
