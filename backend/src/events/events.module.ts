import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  exports: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
