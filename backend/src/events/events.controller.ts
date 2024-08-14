import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RoleGuard } from '../auth/role.guard';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from '../entities/event';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit = 10,
    @Query('sortField') sortField: string,
    @Query('sortOrder') sortOrder: string,
  ): Promise<Pagination<Event>> {
    limit = limit > 100 ? 100 : limit;
    return this.eventsService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/events/',
      sortField,
      sortOrder,
    });
  }

  @Get('get')
  getUser(@Query() getUserDto: { id: number }) {
    return this.eventsService.getUser(getUserDto.id);
  }

  @UseGuards(RoleGuard)
  @Post('update')
  updateUser(@Body() updateUserDto: Record<string, any>) {
    return this.eventsService.updateEvent(
      updateUserDto.id,
      updateUserDto.title,
      updateUserDto.description,
      updateUserDto.startDate,
      updateUserDto.endDate,
      updateUserDto.cost,
      updateUserDto.moreInfo,
      updateUserDto.categories,
      updateUserDto.labels,
      updateUserDto.location,
      updateUserDto.address,
      updateUserDto.organizer,
      updateUserDto.icon,
      updateUserDto.limit,
    );
  }

  @UseGuards(RoleGuard)
  @Post('create')
  createUser(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @UseGuards(RoleGuard)
  @Post('delete')
  deleteUser(@Body() deleteUserDto: { id: number }) {
    return this.eventsService.deleteUser(deleteUserDto.id);
  }
}
