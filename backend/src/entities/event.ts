import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  cost: number;

  @Column()
  moreInfo: string;

  @Column()
  categories: string;

  @Column()
  labels: string;

  @Column()
  location: string;

  @Column()
  address: string;

  @Column()
  organizer: string;

  @Column()
  icon: string;

  @Column()
  limit: number;
}
