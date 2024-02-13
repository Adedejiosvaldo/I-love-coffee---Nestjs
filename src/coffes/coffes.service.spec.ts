import { Test, TestingModule } from '@nestjs/testing';
import { CoffesService } from './coffes.service';
import { Connection } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Coffee } from './entities/coffee.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { ConfigService } from '@nestjs/config';

describe('CoffesService', () => {
  let service: CoffesService;

  //
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffesService,
        { provide: getModelToken(Coffee.name), useValue: Coffee },
      ],
    }).compile();

    service = module.get<CoffesService>(CoffesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
