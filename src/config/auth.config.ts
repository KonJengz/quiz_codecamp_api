import { registerAs } from '@nestjs/config';
import validateConfig from 'src/utils/validateConfig';
import { AllConfigEnum } from './types/all-config.type';
import { AuthConfig } from './types/auth-config.type';
import { IsString } from 'class-validator';

class AuthVariableValidator {
  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  ACCESS_TOKEN_EXPIRES: string;
}

export default registerAs<AuthConfig>(AllConfigEnum.Auth, () => {
  validateConfig(process.env, AuthVariableValidator);

  return {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  };
});
