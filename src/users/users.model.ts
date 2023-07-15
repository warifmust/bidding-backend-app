import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';

@Schema({ timestamps: true })
export class Users extends BaseModel {
  @Prop({ required: true })
  public name?: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: false })
  public balanceAmount?: number;
}
