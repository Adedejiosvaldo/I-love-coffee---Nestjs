import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // Makes sure that the value are passed to a number
  //     @Type(() => Number) -- We remove this when we have desclared enableImplicit conversion in main.ts
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsPositive()
  @IsOptional()
  offset: number;
}
