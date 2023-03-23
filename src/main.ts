import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser({ limit: '524288000' }));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: true,
      skipNullProperties: true,
      stopAtFirstError: false,
      // skipMissingProperties: true
    }),
  ); // Read at https://docs.nestjs.com/techniques/validation
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// mongodb+srv://<username>:<password>@cluster0.zk6j3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
