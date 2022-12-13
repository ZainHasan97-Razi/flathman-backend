import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorSchema } from './color.model';
import { ColorService } from './color.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Color', schema: ColorSchema }]),
  ],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
