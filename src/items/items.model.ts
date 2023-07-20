import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';
import { HydratedDocument } from 'mongoose';

export type ItemsDocument = HydratedDocument<Items>;

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

export const ItemsSchema = SchemaFactory.createForClass(Items);
