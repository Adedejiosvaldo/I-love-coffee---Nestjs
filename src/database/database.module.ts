import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions } from 'mongodb';
import { createConnection } from 'mongoose';

@Module({
  providers: [],
})

// Dynamic Module
export class DatabaseModule {
  static register(options: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        { provide: 'Connection', useValue: createConnection(options) },
      ],
    };
  }
}
