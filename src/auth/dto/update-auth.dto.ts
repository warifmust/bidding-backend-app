import { PartialType } from '@nestjs/swagger';
import { RegisterReqDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(RegisterReqDto) {}
