import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // General route
    consumer.apply(LoggingMiddleware).forRoutes('*');

    // We can add logger for specific routes and method
    //     consumer
    //       .apply(LoggingMiddleware)
    //       .forRoutes({ path: 'coffe', method: RequestMethod.GET });
    //   }

    //   We can also exclude certain routes using exclude
    //   consumer.apply(LoggingMiddleware).exclude('coffe').forRoutes('*');
  }
}
