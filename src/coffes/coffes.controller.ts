import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { response } from 'express';
import { CoffesService } from './coffes.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorators';

// Defines the route of /coffees

@UsePipes(ValidationPipe)
@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffeeService: CoffesService) {}

  // Get Method - Caries out a get method
  //   @UsePipes(ValidationPipe)

  @Get()
  //   @SetMetadata('isPublic', true)

  
  @Public()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  //   We can create a nested route by creating another method
  @Get('flavors')
  getFlavors() {
    // return 'Returns only coffee flavors';
  }

  //   Adding route params eg router:123
  @Get(':id')
  getOne(@Param('id') id: string) {
    // @Params allows us to grab all incoming params and use them inside the function body\
    return this.coffeeService.findOne(id);
    // return `This returns ${id} coffee`;
  }

  //   POST Request and Request Body
  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeDTO: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(createCoffeDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDTO: UpdateCoffeeDto) {
    return this.coffeeService.updateCoffe(id, updateCoffeDTO);
  }

  @Delete(':id')
  deleteCoffe(@Param('id') id: string) {
    return this.coffeeService.deleteCoffee(id);
  }
}

//   //   We can specify a specific value in the request body
//   //   POST Request and Request Body

//   @Post()
//   create(@Body('name') body) {
//     return body;
//   }

//   Switching to express
//   @Get(':id')
//   getOne(@Param('id') id: string, @Res() response) {
//     // @Params allows us to grab all incoming params and use them inside the function body
//     // return `This returns ${id} coffee`;
//     response.status(200).send(`This returns ${id} coffee`);
//   }
