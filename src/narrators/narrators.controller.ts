import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { constructSwaggerErrorResponses } from 'src/shared/swagger.helper';
import { NarratorsReqDto, NarratorsResDto } from './narrators.dto';
import { NarratorsService } from './narrators.service';

@ApiTags('narrators')
@Controller('narrators')
export class NarratorsController {
  constructor(private readonly narratorsService: NarratorsService) {}

  @Get()
  @ApiOperation({
    operationId: 'getNarrators',
    description: 'Get all narrators',
    summary: 'Get all narrators',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Retrieve narrators failed',
        statusCode: 404,
        errorCode: '10002',
      },
    ]),
  )
  async getNarrators(): Promise<NarratorsResDto[]> {
    return this.narratorsService.getNarrators();
  }

  @Get('narrator/:narratorId')
  @ApiOperation({
    operationId: 'getNarrator',
    description: 'Get narrator by id',
    summary: 'Get narrator by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Retrieve narrator by id failed',
        statusCode: 404,
        errorCode: '10002',
      },
    ]),
  )
  async getNarratorById(
    @Param('narratorId') narratorId: string,
  ): Promise<NarratorsResDto> {
    return this.narratorsService.getNarratorById(narratorId);
  }

  @Post('narrator')
  @ApiOperation({
    operationId: 'createNarrator',
    description: 'Create narrator by id',
    summary: 'Create narrator by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Create narrator failed',
        statusCode: 404,
        errorCode: '10001',
      },
    ]),
  )
  async createNarrator(
    @Body() params: NarratorsReqDto,
  ): Promise<NarratorsResDto> {
    return this.narratorsService.createNarrator(params);
  }

  @Put('narrator/:narratorId')
  @ApiOperation({
    operationId: 'updateNarrator',
    description: 'Update narrator by id',
    summary: 'Update narrator by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Update narrator failed',
        statusCode: 404,
        errorCode: '10001',
      },
    ]),
  )
  async updateNarrator(
    @Param('narratorId') narratorId: string,
    @Body() params: NarratorsReqDto,
  ): Promise<NarratorsResDto> {
    return this.narratorsService.updateNarrator(narratorId, params);
  }

  @Delete('narrator/:narratorId')
  @ApiOperation({
    operationId: 'deleteNarrator',
    description: 'Delete narrator by id',
    summary: 'Delete narrator by id',
  })
  @ApiNotFoundResponse(
    constructSwaggerErrorResponses([
      {
        message: 'Delete narrator failed',
        statusCode: 404,
        errorCode: '10001',
      },
    ]),
  )
  async deleteNarrator(
    @Param('narratorId') narratorId: string,
  ): Promise<NarratorsResDto> {
    return this.narratorsService.deleteNarrator(narratorId);
  }
}
