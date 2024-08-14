import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTotalCardDto } from './dto/create-total-card.dto';
import { TotalCard as TotalCardEntity } from '../../entities/total-cards';

export interface TotalCard {
  cardId: number;
  title: string;
  value: number;
  difference: number;
  icon: string;
  format: string;
}

@Injectable()
export class TotalCardsService {
  constructor(
    @InjectRepository(TotalCardEntity)
    private readonly totalCardsRepository: Repository<TotalCardEntity>,
  ) {}

  async getCards(): Promise<TotalCard[]> {
    const totalCards = await this.totalCardsRepository.find();
    return totalCards.map((card) => ({
      cardId: card.id, // Assuming 'id' is the primary key in your User entity
      title: card.title,
      value: card.value,
      difference: card.difference,
      icon: card.icon,
      format: card.format,
    }));
  }

  async createCard(createTotalCardDto: CreateTotalCardDto): Promise<TotalCard> {
    const newCard = this.totalCardsRepository.create(createTotalCardDto);
    const payloadCard = await this.totalCardsRepository.save(newCard);
    return {
      cardId: payloadCard.id,
      title: payloadCard.title,
      value: payloadCard.value,
      difference: payloadCard.difference,
      icon: payloadCard.icon,
      format: payloadCard.format,
    };
  }

  async deleteCard(cardId: number): Promise<void> {
    await this.totalCardsRepository.delete(cardId);
  }

  async updateCard(
    cardId: number,
    title: string,
    value: number,
    difference: number,
    icon: string,
    format: string,
  ): Promise<TotalCard> {
    await this.totalCardsRepository.update(cardId, {
      title,
      value,
      difference,
      icon,
      format,
    });
    const updatedCard = await this.totalCardsRepository.findOne({
      where: { id: cardId },
    });
    return {
      cardId: updatedCard.id,
      title: updatedCard.title,
      value: updatedCard.value,
      difference: updatedCard.difference,
      icon: updatedCard.icon,
      format: updatedCard.format,
    };
  }
}
