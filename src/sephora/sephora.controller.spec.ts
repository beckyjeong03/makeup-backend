import { Test, TestingModule } from '@nestjs/testing';
import { SephoraController } from './sephora.controller';

describe('SephoraController', () => {
  let controller: SephoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SephoraController],
    }).compile();

    controller = module.get<SephoraController>(SephoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
