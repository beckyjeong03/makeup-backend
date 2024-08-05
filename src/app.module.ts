import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SephoraModule } from './sephora/sephora.module';
import { ProductdatasModule } from './productdatas/productdatas.module';

const URL = 'mongodb://localhost:27017/testing';
@Module({
  imports: [SephoraModule, MongooseModule.forRoot(URL), ProductdatasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
