import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../shared/base.model';
import { HydratedDocument } from 'mongoose';

export type BidsDocument = HydratedDocument<Bids>;

@Schema({ timestamps: true })
export class Bids extends BaseModel {
  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public itemId: string;

  @Prop({ required: false })
  public bidderName: string;
}

export const BidsSchema = SchemaFactory.createForClass(Bids);
