import { Test, TestingModule } from '@nestjs/testing';
import { ExecutesService } from './executes.service';

describe('ExecutesService', () => {
  let service: ExecutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutesService],
    }).compile();

    service = module.get<ExecutesService>(ExecutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
