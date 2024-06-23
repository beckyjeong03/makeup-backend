import { Body, Controller, Post } from '@nestjs/common';
import { ProductdatasService } from './productdatas.service';
import { CreateProductDataDto } from './create-productdata.dto';

@Controller('productdatas')
export class ProductdatasController {
  constructor(private productdatasService: ProductdatasService) {}

  @Post()
  create(@Body() createProductDataDto: CreateProductDataDto) {
    console.log(createProductDataDto);
    return this.productdatasService.create(createProductDataDto);
  }
}
