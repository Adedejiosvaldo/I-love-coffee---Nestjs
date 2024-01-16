// Model or data type

import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavors } from './flavors.entity/flavors.entity';

// Multi Index
@Index(['name','id'])
@Entity()
// SQL Table === 'Coffee

export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;


  @Index()
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavors, (flavor) => flavor.coffee, { cascade: true })
  flavors: Flavors[];

  @Column({ default: 0 })
  reccomendations: number;
}
