import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HadithReqDto, HadithResDto } from './hadith.dto';
import { Model } from 'mongoose';
import { Hadith } from './hadith.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HadithService {
  constructor(
    @InjectModel(Hadith.name)
    private readonly hadithsModel: Model<Hadith>,
  ) {}

  async getHadiths(): Promise<HadithResDto[]> {
    return this.hadithsModel.find({}).exec();
  }

  async getHadithById(hadithId: string): Promise<HadithResDto> {
    const hadith = await this.hadithsModel.findById({ _id: hadithId }).exec();
    if (!hadith) {
      throw new HttpException('Hadith not found', HttpStatus.NOT_FOUND);
    }
    return hadith;
  }

  async createHadith(params: HadithReqDto): Promise<HadithResDto> {
    return this.hadithsModel.create({
      content: params.content,
      chains: params.chains,
      narratedBy: params.narratedBy,
      hadithContent: params.hadithContent,
      status: params.status,
    });
  }

  async updateHadith(
    hadithId: string,
    params: HadithReqDto,
  ): Promise<HadithResDto> {
    const hadith = await this.hadithsModel.findById({ _id: hadithId }).exec();
    if (!hadith) {
      throw new HttpException('Hadith not found', HttpStatus.NOT_FOUND);
    }
    return this.hadithsModel
      .findOneAndUpdate(
        {
          _id: hadithId,
        },
        {
          ...(params.content && { content: params.content }),
          ...(params.chains && { chains: params.chains }),
          ...(params.narratedBy && { narratedBy: params.narratedBy }),
          ...(params.hadithContent && { hadithContent: params.hadithContent }),
          ...(params.status && { status: params.status }),
        },
      )
      .exec();
  }

  async deleteHadith(hadithId: string): Promise<HadithResDto> {
    const hadith = await this.hadithsModel.findById({ _id: hadithId }).exec();

    if (!hadith) {
      throw new HttpException('Hadith not found', HttpStatus.NOT_FOUND);
    }
    return this.hadithsModel.findByIdAndRemove(hadithId).exec();
  }
}
