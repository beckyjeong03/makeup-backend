import { Module } from '@nestjs/common';
import { SephoraModule } from './sephora/sephora.module';

@Module({
  imports: [SephoraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
