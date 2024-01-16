import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { coffeeBrandsFactory } from './coffes.module';

@Injectable()
export class CoffesService {
  constructor(
    @InjectModel(Coffee.name) private readonly CoffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly EventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: coffeeBrandsFactory,
  ) {}

  // Get All
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.CoffeeModel.find().limit(limit).skip(offset);
  }

  //   //   Get A coffee
  //   findOne(id: string) {
  //     const coffee = this.coffees.find((item) => item.id === +id); //"+" converts the id to a number
  //     if (!coffee) {
  //       throw new HttpException(`No ID of ${id} found`, HttpStatus.NOT_FOUND);
  //     }
  //     return coffee;
  //   }

  //   //   Get A coffee
  async findOne(id: string) {
    const coffee = await this.CoffeeModel.findById(id);
    if (!coffee) {
      throw new NotFoundException(`No ID of ${id} found`);
    }
    return coffee;
  }

  // Create
  createCoffee(createCoffeeDTO: CreateCoffeeDto) {
    this.CoffeeModel.create(createCoffeeDTO);
    return createCoffeeDTO;
  }

  //   Update
  async updateCoffe(id: string, updateCoffeeDTO: UpdateCoffeeDto) {
    const coffe = await this.CoffeeModel.findByIdAndUpdate(
      id,
      updateCoffeeDTO,
      { new: true },
    );

    if (!coffe) {
      throw new NotFoundException(`No ID of ${id} found`);
    }

    return coffe;
  }

  async deleteCoffee(id: string) {
    const coffeIndex = await this.CoffeeModel.findByIdAndDelete(id);
    if (!coffeIndex) {
      throw new NotFoundException('No Id');
    }

    return new HttpException('', HttpStatus.NO_CONTENT);
  }

  //   async recommendCoffee(coffe: Coffee) {
  //     const session = await this.connection.startSession();

  //     session.startTransaction();

  //     try {
  //       coffe.recommendations++;

  //       const recommendEvent = new this.EventModel({
  //         name: 'recommend_Coffe',
  //         type: 'coffee',
  //         payload: { coffeId: coffe.id },
  //       });
  //       await recommendEvent.save({ session });
  //       await coffe.save({ session });
  //       await session.commitTransaction();
  //     } catch (error) {
  //       await session.abortTransaction();
  //     } finally {
  //       session.endSession();
  //     }
  //   }
}
