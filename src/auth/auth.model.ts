import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';

@Schema({ timestamps: true })
export class Auth extends BaseModel {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: false })
  name?: string;
}
