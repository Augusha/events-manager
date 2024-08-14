import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActiveEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  data0: number;

  @Column()
  data1: number;

  @Column()
  data2: number;

  @Column()
  data3: number;

  @Column()
  data4: number;
}

