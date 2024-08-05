import { Test, TestingModule } from '@nestjs/testing';
import { ProductdatasController } from './productdatas.controller';

describe('ProductdatasController', () => {
  let controller: ProductdatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductdatasController],
    }).compile();

    controller = module.get<ProductdatasController>(ProductdatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
