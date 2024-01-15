import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavors } from './entities/flavors.entity/flavors.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavors,Event])],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
