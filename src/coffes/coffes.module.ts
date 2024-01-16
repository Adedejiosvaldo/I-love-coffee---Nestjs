import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import {
  Event,
  EventSchema,
} from 'src/events/entities/event.entity/event.entity';

class MockclassCoffeeService {}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coffee.name, schema: CoffeeSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [CoffesController],
  //   providers: [CoffesService],
  // Value provider --
  providers: [
    { provide: CoffesService, useValue: new MockclassCoffeeService() },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
