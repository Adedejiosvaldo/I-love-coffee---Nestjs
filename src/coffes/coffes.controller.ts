import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { response } from 'express';

// Defines the route of /coffees
@Controller('coffes')
export class CoffesController {
  // Get Method - Caries out a get method
  @Get()
  findAll(@Query() paginationQuery): string {
    const { limit, skip } = paginationQuery;
    return (
      'This action returns all coffess- Limit' + limit + ' ' + skip + 'skips'
    );
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

  //   Switching to express
  //   @Get(':id')
  //   getOne(@Param('id') id: string, @Res() response) {
  //     // @Params allows us to grab all incoming params and use them inside the function body
  //     // return `This returns ${id} coffee`;
  //     response.status(200).send(`This returns ${id} coffee`);
  //   }

  //   POST Request and Request Body
  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }

  //   //   We can specify a specific value in the request body
  //   //   POST Request and Request Body

  //   @Post()
  //   create(@Body('name') body) {
  //     return body;
  //   }
}
