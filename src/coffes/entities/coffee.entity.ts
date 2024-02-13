// Model or data type

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// Schema Defination
@Schema()
export class Coffee extends Document {
  // Declaring types
  @Prop({ index: true })
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];

  //   Events
  @Prop({ default: 0 })
  recommendations: number;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
