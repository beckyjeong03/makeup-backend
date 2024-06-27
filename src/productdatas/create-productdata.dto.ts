import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateProductDataDto {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  price: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  description?: string[];
}
