import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, KafkaConfig, Producer, Consumer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private readonly kafkaConfig: KafkaConfig = {
    clientId: 'nestjs-kafka-client',
    brokers: ['localhost:9092'], // replace with your broker addresses
  };

  constructor() {
    this.kafka = new Kafka(this.kafkaConfig);
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'nestjs-group' });
  }

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  }

  async produce(topic: string, messages: { key?: string; value: string }[]) {
    await this.producer.send({
      topic,
      messages: messages.map(message => ({
        key: message.key,
        value: message.value,
      })),
    });
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}
