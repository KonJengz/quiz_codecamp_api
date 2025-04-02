import { Test, TestingModule } from '@nestjs/testing';
import { ExecutesController } from './executes.controller';

describe('ExecutesController', () => {
  let controller: ExecutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutesController],
    }).compile();

    controller = module.get<ExecutesController>(ExecutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
