import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDataDocument = HydratedDocument<ProductData>;

@Schema()
export class ProductData {
  @Prop()
  url?: string;

  @Prop()
  title?: string;

  @Prop()
  price?: string;

  @Prop({ type: [String], default: [] })
  description?: string[];
}

export const ProductDataSchema = SchemaFactory.createForClass(ProductData);
