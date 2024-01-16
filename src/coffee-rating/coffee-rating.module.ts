import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffesModule } from 'src/coffes/coffes.module';
import { DatabaseModule } from 'src/database/database.module';
import 'dotenv/config';
console.log(process.env.DATABASE_URL);

@Module({
  imports: [
    CoffesModule,
    // Using dynamic module
    DatabaseModule.register(`${process.env.DATABASE_URL}`),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
