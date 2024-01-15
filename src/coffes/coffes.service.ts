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
import { Flavors } from './entities/flavors.entity/flavors.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavors)
    private readonly flavorRepository: Repository<Flavors>,
  ) {}

  // Get All
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
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
  async createCoffee(createCoffeeDTO: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDTO.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDTO,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  //   Update
  async updateCoffe(id: string, updateCoffeeDTO: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDTO.flavors &&
      (await Promise.all(
        updateCoffeeDTO.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDTO,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavors> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
