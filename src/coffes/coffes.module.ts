import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavors } from './entities/flavors.entity/flavors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavors])],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
