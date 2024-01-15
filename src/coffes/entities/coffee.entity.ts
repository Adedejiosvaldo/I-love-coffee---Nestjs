// Model or data type

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavors } from './flavors.entity/flavors.entity';

@Entity()
// SQL Table === 'Coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavors, (flavor) => flavor.coffee, { cascade: true })
  flavors: Flavors[];
}
