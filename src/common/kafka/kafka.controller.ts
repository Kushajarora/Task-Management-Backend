import { Controller, Get, Post, Body } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('produce')
  async produce(@Body() produceDto: { topic: string; messages: { key?: string; value: string }[] }) {
    await this.kafkaService.produce(produceDto.topic, produceDto.messages);
    return 'Messages sent';
  }

  @Get('consume')
  consume() {
    // Consumption is handled automatically in the service
    return 'Consuming messages... check logs for output';
  }
}
