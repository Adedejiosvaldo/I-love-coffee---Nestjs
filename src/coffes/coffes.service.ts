import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Sheep Roast',
      brand: 'Buddy',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  // Get All
  findAll() {
    return this.coffees;
  }

  //   Get A coffee
  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id); //"+" converts the id to a number
  }

  // Create
  createCoffee(createCoffeeDTO: any) {
    this.coffees.push(createCoffeeDTO);
    return createCoffeeDTO;
  }

  //   Update
  updateCoffe(id: string, updateCoffeeDTO: any) {
    const existingCoffe = this.findOne(id);
    if (existingCoffe) {
    }
    return 'Updated Successfully';
  }

  deleteCoffee(id: string) {
    const coffeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeIndex >= 0) {
      this.coffees.splice(coffeIndex, 1);
    }
    return 'Deleted Successfully';
  }
}
