import { Body, Controller, Post } from '@nestjs/common';
import { authPath } from 'src/common/path';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthLoginResponse } from './dto/login.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller({ version: '1', path: authPath.base })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthLoginDto })
  @ApiOkResponse({})
  @Post(authPath.login)
  async login(@Body() body: AuthLoginDto): Promise<AuthLoginResponse> {
    return AuthLoginResponse.postSuccess(`${authPath.base}${authPath.login}`, {
      accessToken: '',
    });
  }
}
