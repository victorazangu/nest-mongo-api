import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: 'String', required: true })
  name: string;

  @Prop({ type: 'String', required: true, unique: true })
  email: string;

  @Prop({ type: 'String', required: true })
  password: string;

  @Prop({ type: 'String' })
  image: string;

  @Prop({ type: 'Boolean', default: false })
  is_deleted: boolean;

  // get id() {
  //   return this._id;
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);
