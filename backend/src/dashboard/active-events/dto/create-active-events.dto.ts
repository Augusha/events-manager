import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActiveEventsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  data0: number;

  data1: number;

  data2: number;

  data3: number;

  data4: number;
}
