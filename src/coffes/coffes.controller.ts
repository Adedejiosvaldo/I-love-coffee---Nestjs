import { Controller, Get } from '@nestjs/common';

// Defines the route of /coffees
@Controller('coffes')
export class CoffesController {
  // Get Method - Caries out a get method
  @Get()
  findAll() {
    return 'This action returns all coffess';
  }

  //   We can create a nested route by creating another method
  @Get('flavors')
  getFlavors() {
    return 'Returns only coffee flavors';
  }
}
