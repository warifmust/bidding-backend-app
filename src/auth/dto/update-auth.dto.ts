import { PartialType } from '@nestjs/swagger';
import { CreateAuthReqDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthReqDto) {}
