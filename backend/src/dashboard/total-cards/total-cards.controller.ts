import { Body, Controller, Get, Post } from '@nestjs/common';
import { TotalCardsService } from './total-cards.service';
import { CreateTotalCardDto } from './dto/create-total-card.dto';

@Controller('total-cards')
export class TotalCardsController {
  constructor(private readonly totalCardsService: TotalCardsService) {}

  @Post('create')
  createCard(@Body() createTotalCardDto: CreateTotalCardDto) {
    return this.totalCardsService.createCard(createTotalCardDto);
  }

  @Post('delete')
  deleteCard(@Body() id: number) {
    return this.totalCardsService.deleteCard(id);
  }

  @Get('get')
  getCards() {
    return this.totalCardsService.getCards();
  }

  @Post('update')
  updateCard(@Body() updateTotalCardDto: Record<string, any>) {
    return this.totalCardsService.updateCard(
      updateTotalCardDto.cardId,
      updateTotalCardDto.title,
      updateTotalCardDto.value,
      updateTotalCardDto.difference,
      updateTotalCardDto.icon,
      updateTotalCardDto.format,
    );
  }
}
