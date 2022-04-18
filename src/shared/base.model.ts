import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, Document } from 'mongoose';

export abstract class BaseModel extends Document {
  @ApiProperty({ type: 'string', format: 'date-time' })
  @Prop()
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Prop()
  updatedAt: Date;

  @ApiProperty({
    description: 'System generated unique id',
  })
  id: string;
  static get schema(): Schema {
    return SchemaFactory.createForClass(this as any);
  }
  static get modelName(): string {
    return this.name;
  }
}
