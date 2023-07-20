import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth extends BaseModel {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: false })
  name?: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
