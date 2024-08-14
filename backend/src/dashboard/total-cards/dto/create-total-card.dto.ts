import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTotalCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  value: number;

  @IsNotEmpty()
  @IsString()
  difference: number;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  format: string;
}
