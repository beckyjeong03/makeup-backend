import { Controller, Get, Query } from '@nestjs/common';
import { SephoraService } from './sephora.service';

@Controller('sephora')
export class SephoraController {
  constructor(private sephoraService: SephoraService) {}
  @Get('products')
  async getProducts(@Query('product') product: string) {
    return this.sephoraService.getProducts(product);
  }
}
