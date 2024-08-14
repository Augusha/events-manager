import { Module } from '@nestjs/common';
import { ActiveEventsService } from './active-events.service';
import { ActiveEventsController } from './active-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveEvent } from '../../entities/active-event';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveEvent])],
  providers: [ActiveEventsService],
  controllers: [ActiveEventsController],
  exports: [ActiveEventsService],
})
export class ActiveEventsModule {}
