import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  // Get All
  findAll() {
    return this.coffeeRepository.find();
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
    const coffee = await this.coffeeRepository.findOneBy({ id: +id }); //"+" converts the id to a number
    if (!coffee) {
      throw new NotFoundException(`No ID of ${id} found`);
    }
    return coffee;
  }

  // Create
  createCoffee(createCoffeeDTO: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDTO);
    return this.coffeeRepository.save(coffee);
  }

  //   Update
  async updateCoffe(id: string, updateCoffeeDTO: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDTO,
    });

    if (!coffee) {
      return new NotFoundException('ID not found');
    }
    return this.coffeeRepository.save(coffee);
  }

  async deleteCoffee(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({ id: +id });
    return this.coffeeRepository.remove(coffee);
  }
}
