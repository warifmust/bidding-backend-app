import { Injectable } from '@nestjs/common';

@Injectable()
export class HadithService {
  getHello(): string {
    return 'Hello World!';
  }
}
