import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';

@Schema({ timestamps: true })
export class Bids extends BaseModel {
  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public itemId: string;
}
