import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as schema } from 'mongoose';
import { Product } from 'src/product/entity/product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategorySchema };
