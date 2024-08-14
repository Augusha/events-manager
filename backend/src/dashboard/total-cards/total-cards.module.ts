import { Module } from '@nestjs/common';
import { TotalCardsService } from './total-cards.service';
import { TotalCardsController } from './total-cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TotalCard } from '../../entities/total-cards';

@Module({
  imports: [TypeOrmModule.forFeature([TotalCard])],
  controllers: [TotalCardsController],
  providers: [TotalCardsService],
  exports: [TotalCardsService],
})
export class TotalCardsModule {}
