import { registerAs } from '@nestjs/config';
import { ClientConfig } from './types/client-config.type';
import { IsString } from 'class-validator';
import { AllConfigEnum } from './types/all-config.type';
import validateConfig from 'src/utils/validateConfig';

class ClientVariableValidator {
  @IsString()
  CLIENT_DOMAIN: string;
}

export default registerAs<ClientConfig>(AllConfigEnum.Client, () => {
  validateConfig(process.env, ClientVariableValidator);

  return {
    domain: process.env.CLIENT_DOMAIN || 'http://localhost:5173',
  };
});
