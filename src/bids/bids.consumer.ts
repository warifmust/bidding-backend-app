import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { REGISTER_QUEUE_NAME } from './bids.const';

@Processor(REGISTER_QUEUE_NAME)
export class BidsConsumer {
  private readonly logger = new Logger(BidsConsumer.name);

  @Process()
  async transcodeBids(job: Job) {
    this.logger.log(job);
  }
}
