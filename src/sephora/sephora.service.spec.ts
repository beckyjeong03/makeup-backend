import { Test, TestingModule } from '@nestjs/testing';
import { SephoraService } from './sephora.service';

describe('SephoraService', () => {
  let service: SephoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SephoraService],
    }).compile();

    service = module.get<SephoraService>(SephoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
