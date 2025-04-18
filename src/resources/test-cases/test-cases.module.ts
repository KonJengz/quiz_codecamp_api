import { Module } from '@nestjs/common';
import { TestCasesService } from './test-cases.service';
import { AuthModule } from 'src/application/auth/auth.module';
import { TestCasesController } from './test-cases.controller';

@Module({
  imports: [AuthModule],
  controllers: [TestCasesController],
  providers: [TestCasesService],
})
export class TestCasesModule {}
