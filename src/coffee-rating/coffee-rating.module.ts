import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffesModule } from 'src/coffes/coffes.module';

@Module({ imports: [CoffesModule], providers: [CoffeeRatingService] })
export class CoffeeRatingModule {}
