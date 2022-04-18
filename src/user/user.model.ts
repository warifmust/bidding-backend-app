import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from 'src/shared/base.model';

@Schema({ timestamps: true })
export class User extends BaseModel {
  @Prop({ required: false })
  public name?: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;
}
