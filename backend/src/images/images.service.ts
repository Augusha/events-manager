import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getImage(imageId: number): Promise<{ image: string }> {
    const imageExists = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!imageExists) {
      throw new Error(`Image not found`);
    } else {
      return { image: imageExists.image };
    }
  }

  async deleteImage(imageId: number): Promise<{ message: string }> {
    const imageExists = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!imageExists) {
      throw new Error(`Image not found`);
    } else {
      await this.imageRepository.delete(imageId);
      return { message: 'Image deleted' };
    }
  }
}
