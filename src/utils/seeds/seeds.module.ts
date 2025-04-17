import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Module({
  imports: [],
  providers: [SeedsService],
})
export class SeedsModule {}
