// Model or data type

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// SQL Table === 'Coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
