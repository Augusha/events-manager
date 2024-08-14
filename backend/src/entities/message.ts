import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chatId: number;

  @Column()
  content: string;

  @Column()
  senderId: number;

  @Column()
  createdAt: Date;
}
