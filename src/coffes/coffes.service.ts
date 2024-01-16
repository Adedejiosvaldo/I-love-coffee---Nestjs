import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';

@Injectable()
export class CoffesService {
  constructor(
    @InjectModel(Coffee.name) private readonly CoffeeModel: Model<Coffee>,
  ) {}

  // Get All
  findAll() {
    return this.CoffeeModel.find();
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
}
