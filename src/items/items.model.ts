import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';

@Schema({ timestamps: true })
export class Items extends BaseModel {
  @Prop({ required: true })
  public itemName: string;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public durationInMinutes: number;

  @Prop({ required: false })
  public belongsTo?: string;

  @Prop({ required: true, default: false })
  public expired: boolean;
}
