import { IsString, IsOptional } from 'class-validator';

export class CreateProductDataDto {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  price: string;

  @IsString()
  @IsOptional()
  description?: string;
}
