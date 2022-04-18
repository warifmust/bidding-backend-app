import { HttpStatus } from '@nestjs/common';

export interface IGeneralErrorShape {
  message: string;
  description?: string;
  errorCode: string;
  code?: string;
  statusCode?: HttpStatus;
  stackTrace?: any;
  logData?: any;
}
