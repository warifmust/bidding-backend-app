import { Processor } from '@nestjs/bull';
import { ITEMS_QUEUE_NAME } from './items.const';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor(ITEMS_QUEUE_NAME)
export class ItemsConsumer {
  private readonly logger = new Logger(ItemsConsumer.name);

  async transcode(job: Job<unknown>) {
    this.logger.log(job);
  }
}
