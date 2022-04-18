import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { constructSwaggerErrorResponses } from 'src/shared/swagger.helper';
import { HadithReqDto, HadithResDto } from './hadith.dto';
import { HadithService } from './hadith.service';

@ApiTags('hadiths')
@Controller('hadiths')
export class HadithController {
  constructor(private readonly hadithService: HadithService) {}

  @Get()
  @ApiOperation({
    operationId: 'getHadiths',
    description: 'Get all hadith',
    summary: 'Get all hadith',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Retrieve hadiths failed',
        statusCode: 404,
        errorCode: '10002',
      },
    ]),
  )
  async getHadiths(): Promise<HadithResDto[]> {
    return this.hadithService.getHadiths();
  }

  @Get('hadith/:hadithId')
  @ApiOperation({
    operationId: 'getHadith',
    description: 'Get hadith by id',
    summary: 'Get hadith by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Hadith not found',
        statusCode: 404,
        errorCode: '10003',
      },
    ]),
  )
  async getHadithById(
    @Param('hadithId') hadithId: string,
  ): Promise<HadithResDto> {
    return this.hadithService.getHadithById(hadithId);
  }

  @Post('hadith')
  @ApiOperation({
    operationId: 'createHadith',
    description: 'Create hadith by id',
    summary: 'Create hadith by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Create hadith failed',
        statusCode: 404,
        errorCode: '10001',
      },
    ]),
  )
  async createHadith(@Body() params: HadithReqDto): Promise<HadithResDto> {
    return this.hadithService.createHadith(params);
  }

  @Put('hadith/:hadithId')
  @ApiOperation({
    operationId: 'updateHadith',
    description: 'Update hadith by id',
    summary: 'Update hadith by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Hadith not found',
        statusCode: 404,
        errorCode: '10003',
      },
    ]),
  )
  async updateHadith(
    @Param('hadithId') hadithId: string,
    @Body() params: HadithReqDto,
  ): Promise<any> {
    return this.hadithService.updateHadith(hadithId, params);
  }

  @Delete('hadith/:hadithId')
  @ApiOperation({
    operationId: 'deleteHadith',
    description: 'Delete hadith by id',
    summary: 'Delete hadith by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Hadith not found',
        statusCode: 404,
        errorCode: '10003',
      },
    ]),
  )
  async deleteHadith(
    @Param('hadithId') hadithId: string,
  ): Promise<HadithResDto> {
    return this.hadithService.deleteHadith(hadithId);
  }
}
