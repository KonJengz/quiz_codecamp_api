import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HTTPMethod } from 'src/common/types/http.type';

export const corsOptions = (clientDomain: string): CorsOptions => {
  const origin = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    clientDomain,
  ];
  return {
    origin,
    methods: [
      HTTPMethod.GET,
      HTTPMethod.POST,
      HTTPMethod.PATCH,
      HTTPMethod.PUT,
      HTTPMethod.DELETE,
    ],
  };
};
