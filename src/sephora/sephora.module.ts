import { Module } from '@nestjs/common';
import { SephoraController } from './sephora.controller';
import { SephoraService } from './sephora.service';
import { ProductdatasModule } from 'src/productdatas/productdatas.module';

@Module({
  imports: [ProductdatasModule],
  controllers: [SephoraController],
  providers: [SephoraService],
})
export class SephoraModule {}
