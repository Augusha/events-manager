import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entities/image';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
