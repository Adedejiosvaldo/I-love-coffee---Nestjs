import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coffee.name, schema: CoffeeSchema }]),
  ],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
