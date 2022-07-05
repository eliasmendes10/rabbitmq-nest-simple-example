import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitmqServer from './rabbitmq-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005);

  const server = new RabbitmqServer('amqp://rabbitmq:rabbitmq@localhost:5672');
  // await server.start();
  // await server.consume('imports', (message) =>
  //   console.log(message.content.toString()),
  // );
}
bootstrap();
