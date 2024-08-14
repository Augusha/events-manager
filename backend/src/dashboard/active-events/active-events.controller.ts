import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveEventsService } from './active-events.service';
import { CreateActiveEventsDto } from './dto/create-active-events.dto';

@Controller('active-events')
export class ActiveEventsController {
  constructor(private readonly activeEventsService: ActiveEventsService) {}

  @Post('create')
  create(@Body() CreateActiveEventsDto: CreateActiveEventsDto) {
    return this.activeEventsService.create(CreateActiveEventsDto);
  }

  @Post('delete')
  delete(@Body() id: number) {
    return this.activeEventsService.delete(id);
  }

  @Get('get')
  get() {
    return this.activeEventsService.get();
  }

  @Post('update')
  update(@Body() updateActiveEvent: Record<string, any>) {
    return this.activeEventsService.update(
      updateActiveEvent.id,
      updateActiveEvent.name,
      updateActiveEvent.data0,
      updateActiveEvent.data1,
      updateActiveEvent.data2,
      updateActiveEvent.data3,
      updateActiveEvent.data4,
    );
  }
}
