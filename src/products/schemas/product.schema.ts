import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';

export type ProductSchema = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: 'Number', default: 0, required: true })
  inventory: number;

  @Prop({ type: 'Number', required: true })
  price: number;

  @Prop({ type: 'String', required: true })
  description: string;

  @Prop({ type: 'String' })
  image: string;

  @Prop({ type: 'Number', required: true })
  product_number: number;

  @Prop({ type: 'Boolean', default: false })
  is_deleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
