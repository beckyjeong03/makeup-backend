import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductdatasController } from './productdatas.controller';
import { ProductdatasService } from './productdatas.service';
import { ProductData, ProductDataSchema } from './productdata.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductData.name,
        schema: ProductDataSchema,
      },
    ]),
  ],
  controllers: [ProductdatasController],
  providers: [ProductdatasService],
  exports: [ProductdatasService],
})
export class ProductdatasModule {}
