import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from 'src/shared/base.model';
import { DefaultSchemaOptions } from 'src/shared/swagger.helper';
import { HadithStatus } from './hadith.enum';

@Schema({ _id: false })
export class Content {
  @Prop({ required: true })
  public volume: number;

  @Prop({ required: true })
  public bookNumber: number;

  @Prop({ required: true })
  public bookName: string;

  @Prop({ required: true })
  public hadithNumber: number;
}

@Schema({ _id: false })
export class HadithContent {
  @Prop({ required: false })
  public arabic?: string;

  @Prop({ required: false })
  public english?: string;

  @Prop({ required: false })
  public malay?: string;
}

@Schema(DefaultSchemaOptions)
export class Hadith extends BaseModel {
  @Prop({ required: true, type: Content })
  public content: Content;

  @Prop({ required: true, type: [String] })
  public chains: string[];

  @Prop({ required: true })
  public narratedBy: string;

  @Prop({ required: true, type: HadithContent })
  public hadithContent: HadithContent;

  @Prop({
    required: true,
    enum: HadithStatus,
    default: HadithStatus.SAHIH,
    type: String,
  })
  public status: HadithStatus;
}
