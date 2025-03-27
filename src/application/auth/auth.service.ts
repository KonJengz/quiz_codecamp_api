import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  AuthLoginDto } from './dto/login.dto';
import { AllConfigEnum, AllConfigType } from 'src/config/types/all-config.type';
import { AuthConfig } from 'src/config/types/auth-config.type';
import { JwtPayloadType } from 'src/common/types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/resources/users/domain/user.domain';
import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class AuthService {
  private accessTokenSecret: string;
  private accessTokenExpires: string;
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService 
  ) {
    this.accessTokenSecret = configService.getOrThrow<AuthConfig>(
      `${AllConfigEnum.Auth}.accessTokenSecret`,
      { infer: true },
    );
    this.accessTokenExpires = configService.getOrThrow<AuthConfig>(
      `${AllConfigEnum.Auth}.accessTokenExpiresIn`,
      { infer: true },
    );
  }

  async validateLogin(data: AuthLoginDto): Promise<User> {
    const isUserExist = await this.;

  }

  async generateToken(payload: JwtPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.accessTokenSecret,
      expiresIn: this.accessTokenExpires,
    });
  }
}
