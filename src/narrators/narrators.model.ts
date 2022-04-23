import { Prop, Schema } from '@nestjs/mongoose';
import { BaseModel } from 'src/shared/base.model';
import { DefaultSchemaOptions } from 'src/shared/swagger.helper';
import { Bani, BirthPlace, NarratorsStatus } from './narrators.enum';

@Schema(DefaultSchemaOptions)
export class Narrators extends BaseModel {
  @Prop({ required: true })
  public name: string;

  @Prop({
    required: true,
    enum: NarratorsStatus,
    default: NarratorsStatus.THIQAH,
    type: String,
  })
  public status: NarratorsStatus;

  @Prop({
    required: true,
    enum: BirthPlace,
    default: BirthPlace.MAKKAH,
    type: String,
  })
  public birthPlace: BirthPlace;

  @Prop({ required: true, enum: Bani, default: Bani.UNKNOWN, type: String })
  public bani: Bani;

  @Prop({ required: false, type: [String] })
  public misc?: [string];
}
