import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, Event as EventEntity } from '../entities/event';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateEventDto } from './dto/createEvent.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private jwtService: JwtService,
  ) {}

  async paginate(
    options: IPaginationOptions & { sortField?: string; sortOrder?: string },
  ): Promise<Pagination<EventEntity>> {
    const queryBuilder = this.eventRepository.createQueryBuilder('user');
    if (options.sortField && options.sortOrder) {
      queryBuilder.orderBy(
        `user.${options.sortField}`,
        options.sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      );
    } else {
      queryBuilder.orderBy('user.id', 'DESC'); // Default sorting
    }

    return paginate<EventEntity>(queryBuilder, options);
  }

  async updateEvent(
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    cost: number,
    moreInfo: string,
    categories: string,
    labels: string,
    location: string,
    address: string,
    organizer: string,
    icon: string,
    limit: number,
  ): Promise<{ message: string }> {
    const event = await this.eventRepository.findOne({ where: { id: id } });

    if (!event) {
      throw new Error('Event not found');
    } else {
      event.title = title;
      event.description = description;
      event.startDate = startDate;
      event.endDate = endDate;
      event.cost = cost;
      event.moreInfo = moreInfo;
      event.categories = categories;
      event.labels = labels;
      event.location = location;
      event.address = address;
      event.organizer = organizer;
      event.icon = icon;
      event.limit = limit;

      await this.eventRepository.save(event);

      return { message: 'User successfully updated' };
    }
  }

  async getUser(eventId: number): Promise<{ event: Event }> {
    const eventExists = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!eventExists) {
      throw new Error('User not found');
    } else {
      return { event: eventExists };
    }
  }

  async deleteUser(eventId: number): Promise<{ message: string }> {
    const eventExists = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!eventExists) {
      throw new Error('User not found');
    }

    await this.eventRepository.delete(eventId);

    return { message: 'User successfully deleted' };
  }

  async createEvent(
    createEventDto: CreateEventDto,
  ): Promise<{ message: string }> {
    const newUser = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(newUser);
    return { message: 'Event successfully created!' };
  }
}
