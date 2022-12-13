import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create.color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('create')
  create(@Body() body: CreateColorDto) {
    return this.colorService.create(body);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.colorService.delete(id);
  }
}
