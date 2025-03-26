import { ThrottlerOptions } from '@nestjs/throttler';

export const throttlerOptions: ThrottlerOptions[] = [
  {
    name: 'short',
    ttl: 1000,
    limit: 5,
  },
  {
    name: 'short',
    ttl: 10000,
    limit: 50,
  },
  {
    name: 'short',
    ttl: 20000,
    limit: 80,
  },
];
