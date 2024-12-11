import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema({ timestamps: true })
export class Category {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true })
  description: string;

  @Prop({ type: 'Boolean', default: false })
  is_deleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
