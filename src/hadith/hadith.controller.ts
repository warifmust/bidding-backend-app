import { Controller, Get } from '@nestjs/common';
import { HadithService } from './hadith.service';

@Controller()
export class HadithController {
  constructor(private readonly hadithService: HadithService) {}

  @Get()
  getHello(): string {
    return this.hadithService.getHello();
  }
}
