import { Module } from '@nestjs/common';
import { SephoraController } from './sephora.controller';
import { SephoraService } from './sephora.service';

@Module({
  controllers: [SephoraController],
  providers: [SephoraService],
})
export class SephoraModule {}
