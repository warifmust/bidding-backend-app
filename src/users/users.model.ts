import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users extends BaseModel {
  @Prop({ required: true })
  public name?: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: false, type: Number })
  public balanceAmount?: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
