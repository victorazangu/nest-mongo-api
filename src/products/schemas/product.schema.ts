import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductSchema = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;

  @Prop()
  inventory: number;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  product_number: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
