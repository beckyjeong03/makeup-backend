import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductData } from './productdata.schema';
import { CreateProductDataDto } from './create-productdata.dto';

@Injectable()
export class ProductdatasService {
  constructor(
    @InjectModel(ProductData.name) private productdataModel: Model<ProductData>,
  ) {}

  async create(
    createProductDataDto: CreateProductDataDto,
  ): Promise<ProductData> {
    const createProductData = new this.productdataModel(createProductDataDto);
    console.log(createProductData);
    return createProductData.save();
  }

  async findAll(): Promise<ProductData[]> {
    return this.productdataModel.find().exec();
  }
}
