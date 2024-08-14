import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveEvent as ActiveEventEntity } from '../../entities/active-event';
import { CreateActiveEventsDto } from './dto/create-active-events.dto';

export interface ActiveEvent {
  id: number;
  name: string;
  data0: number;
  data1: number;
  data2: number;
  data3: number;
  data4: number;
}

@Injectable()
export class ActiveEventsService {
  constructor(
    @InjectRepository(ActiveEventEntity)
    private readonly activeEventRepository: Repository<ActiveEventEntity>,
  ) {}

  async get(): Promise<ActiveEvent[]> {
    const totalEvents = await this.activeEventRepository.find();
    return totalEvents.map((event) => ({
      id: event.id, // Assuming 'id' is the primary key in your User entity
      name: event.name,
      data0: event.data0,
      data1: event.data1,
      data2: event.data2,
      data3: event.data3,
      data4: event.data4,
    }));
  }

  async create(
    CreateActiveEventsDto: CreateActiveEventsDto,
  ): Promise<ActiveEvent> {
    const newEvent = this.activeEventRepository.create(CreateActiveEventsDto);
    const payloadEvents = await this.activeEventRepository.save(newEvent);
    return {
      id: payloadEvents.id,
      name: payloadEvents.name,
      data0: payloadEvents.data0,
      data1: payloadEvents.data1,
      data2: payloadEvents.data2,
      data3: payloadEvents.data3,
      data4: payloadEvents.data4,
    };
  }

  async delete(cardId: number): Promise<void> {
    await this.activeEventRepository.delete(cardId);
  }

  async update(
    id: number,
    name: string,
    data0: number,
    data1: number,
    data2: number,
    data3: number,
    data4: number,
  ): Promise<ActiveEvent> {
    await this.activeEventRepository.update(id, {
      name,
      data0,
      data1,
      data2,
      data3,
      data4,
    });
    const updatedEvent = await this.activeEventRepository.findOne({
      where: { id: id },
    });
    return {
      id: updatedEvent.id,
      name: updatedEvent.name,
      data0: updatedEvent.data0,
      data1: updatedEvent.data1,
      data2: updatedEvent.data2,
      data3: updatedEvent.data3,
      data4: updatedEvent.data4,
    };
  }
}
