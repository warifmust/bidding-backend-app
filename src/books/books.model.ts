import { Prop, Schema } from "@nestjs/mongoose";
import { BaseModel } from "src/shared/base.model";
import { DefaultSchemaOptions } from 'src/shared/swagger.helper';
import { BooksName } from "./books.enum";

@Schema({ _id: false })
export class Author {
    @Prop({ required: true })
    public name: string;
    
    @Prop({ required: true })
    public kunyah: string;

    @Prop({ required: true })
    public birthPlace: string;
}

@Schema({ _id: false })
export class BestSyarah {
    @Prop({ required: true })
    public syarahName: string;

    @Prop({ required: true })
    public syarahAuthor: string;

    @Prop({ required: true })
    public birthPlace: string;
}

@Schema({ _id: false })
export class Syarah {
    @Prop({ required: true })
    public syarahList: string[];

    @Prop({ required: true })
    public bestSyarah: BestSyarah;
}

@Schema(DefaultSchemaOptions)
export class Books extends BaseModel {
    @Prop({ required: true, enum: BooksName, default: BooksName.SAHIH_BUKHARI, type: String })
    public name: BooksName;

    @Prop({ required: true })
    public author: Author;

    @Prop({ required: true })
    public syarah: Syarah;
}