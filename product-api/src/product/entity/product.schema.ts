import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema };
