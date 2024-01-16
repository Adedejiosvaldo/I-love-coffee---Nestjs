import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesModule } from './coffes/coffes.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    CoffesModule,
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
