import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NarratorsReqDto, NarratorsResDto } from './narrators.dto';
import { Model } from 'mongoose';
import { Narrators } from './narrators.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NarratorsService {
  constructor(
    @InjectModel(Narrators.name)
    private readonly narratorsModel: Model<Narrators>,
  ) {}

  async getNarrators(): Promise<NarratorsResDto[]> {
    return this.narratorsModel.find({}).exec();
  }

  async getNarratorById(narratorId: string): Promise<NarratorsResDto> {
    const narrator = await this.narratorsModel
      .findById({ _id: narratorId })
      .exec();
    if (!narrator) {
      throw new HttpException('Narrator not found', HttpStatus.NOT_FOUND);
    }
    return narrator;
  }

  async createNarrator(params: NarratorsReqDto): Promise<NarratorsResDto> {
    return this.narratorsModel.create({
      name: params.name,
      status: params.status,
      birthPlace: params.birthPlace,
      bani: params.bani,
      misc: params.misc,
    });
  }

  async updateNarrator(
    narratorId: string,
    params: NarratorsReqDto,
  ): Promise<NarratorsResDto> {
    const narrator = await this.narratorsModel
      .findById({ _id: narratorId })
      .exec();
    if (!narrator) {
      throw new HttpException('Narrator not found', HttpStatus.NOT_FOUND);
    }
    return this.narratorsModel
      .findOneAndUpdate(
        {
          _id: narratorId,
        },
        {
          ...(params.name && { name: params.name }),
          ...(params.status && { status: params.status }),
          ...(params.birthPlace && { birthPlace: params.birthPlace }),
          ...(params.bani && { bani: params.bani }),
          ...(params.misc && { $push: { misc: params.misc } }),
        },
      )
      .exec();
  }

  async deleteNarrator(narratorId: string): Promise<NarratorsResDto> {
    const hadith = await this.narratorsModel
      .findById({ _id: narratorId })
      .exec();

    if (!hadith) {
      throw new HttpException('Narrator not found', HttpStatus.NOT_FOUND);
    }
    return this.narratorsModel.findByIdAndRemove(narratorId).exec();
  }
}
