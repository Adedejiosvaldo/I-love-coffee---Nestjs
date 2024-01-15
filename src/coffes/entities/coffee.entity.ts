// Model or data type

import { Entity } from 'typeorm';

@Entity()
// SQL Table === 'Coffee
export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
