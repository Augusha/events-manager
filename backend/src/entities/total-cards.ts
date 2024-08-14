import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TotalCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  difference: number;

  @Column()
  icon: string;

  @Column()
  format: string;
}
