import { Controller, Get, Param } from '@nestjs/common';

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
  
  //   Adding route params eg router:123
  @Get(':id')
  getOne(@Param('id') id: string) {
    // @Params allows us to grab all incoming params and use them inside the function body
    return `This returns ${id} coffee`;
  }
}
