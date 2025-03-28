import { Body, Controller, Post } from '@nestjs/common';
import { authPath } from 'src/common/path';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthLoginResponse } from './dto/login.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller({ version: '1', path: authPath.base })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthLoginDto })
  @ApiOkResponse({ type: AuthLoginResponse })
  @Post(authPath.login)
  async login(@Body() body: AuthLoginDto): Promise<AuthLoginResponse> {
    const user = await this.authService.validateLogin(body);

    const accessToken = await this.authService.generateToken({
      sub: user.id,
      role: user.role,
    });

    return AuthLoginResponse.postSuccess(`${authPath.base}${authPath.login}`, {
      accessToken,
    });
  }
}
