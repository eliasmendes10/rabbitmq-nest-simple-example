import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import RabbitmqServer from './rabbitmq-server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('publisher')
  async publisher(@Req() request: Request) {
    const server = new RabbitmqServer(
      'amqp://rabbitmq:rabbitmq@localhost:5672',
    );
    await server.start();
    await server.publishInExchange(
      'amq.direct',
      'xy',
      JSON.stringify(request.body),
    );
    return request.body;
  }
}
