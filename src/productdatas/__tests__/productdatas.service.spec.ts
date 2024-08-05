import { Test, TestingModule } from '@nestjs/testing';
import { ProductdatasService } from '../productdatas.service';

describe('ProductdatasService', () => {
  let service: ProductdatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductdatasService],
    }).compile();

    service = module.get<ProductdatasService>(ProductdatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
