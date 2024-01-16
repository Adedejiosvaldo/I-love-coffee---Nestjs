import { Injectable, Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import {
  Event,
  EventSchema,
} from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { Connection } from 'mongoose';

class MockclassCoffeeService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// Provider
@Injectable()
export class coffeeBrandsFactory {
  create() {
    return ['Helllo', 'brew buddy', 'nescafe'];
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coffee.name, schema: CoffeeSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [CoffesController],
  providers: [
    CoffesService,
    // coffeeBrandsFactory,

    // Non class providers
    { provide: COFFEE_BRANDS, useValue: ['brew buddy', 'nescafe'] },

    // UseClass providers
    // {
    //   provide: COFFEE_BRANDS,
    //   useClass:
    //     process.env.NODE_ENV === 'dev'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
    // useFactory providers
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandFactory: coffeeBrandsFactory) => brandFactory.create(),
    //   inject: [coffeeBrandsFactory],
    // },

    // Async Providers
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     const coffee = await Promise.resolve(['brew buddy', 'nescafe']);
    //     console.log('[!] Async Factory');
    //     return coffee;
    //   },
    //   inject: [Connection],
    // },
  ],
  // Value provider --
  //   providers: [
  //     { provide: CoffesService, useValue: new MockclassCoffeeService() },
  //   ],
  exports: [CoffesService],
})
export class CoffesModule {}
