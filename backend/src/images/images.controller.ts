import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('get')
  getImage(@Query() getImageDto: { id: number }) {
    return this.imagesService.getImage(getImageDto.id);
  }

  @Post('delete')
  deleteImage(@Body() deleteImageDto: { id: number }) {
    return this.imagesService.deleteImage(deleteImageDto.id);
  }
}
