import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type dataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  url: string;

  @Prop()
  title: string;

  @Prop()
  price: string;

  @Prop()
  description: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
