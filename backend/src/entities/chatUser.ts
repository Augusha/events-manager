import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  userId: number;
}
