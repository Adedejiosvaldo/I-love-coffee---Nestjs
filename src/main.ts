import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptorInterceptor } from './common/interceptor/wrap-response.interceptor/wrap-response.interceptor.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   HTTP Exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Guard
  //   app.useGlobalGuards(new ApiKeyGuard());

  // Interceptors
  app.useGlobalInterceptors(
    new WrapResponseInterceptorInterceptor(),
    new TimeoutInterceptor(),
  );

  //   Created a validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
