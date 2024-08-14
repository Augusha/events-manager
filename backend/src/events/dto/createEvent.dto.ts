import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsString()
  cost: number;

  @IsString()
  moreInfo: string;

  @IsString()
  categories: string;

  @IsString()
  labels: string;

  @IsString()
  location: string;

  @IsString()
  address: string;

  @IsString()
  organizer: string;

  @IsString()
  icon: string;

  @IsString()
  limit: number;
}
