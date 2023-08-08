import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UsePipes,
  Param,
} from '@nestjs/common';
import { AppVersionService } from './appVersion.service';
import { CreateAppVersionDto } from './dto/create.appversion.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';

@Controller('app-version')
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Post('create')
  create(@Body() body: CreateAppVersionDto) {
    return this.appVersionService.create(body);
  }

  @Post('current')
  getCurrentVersion(@Body() body: { platform: string }) {
    return this.appVersionService.findCurrentVersion(body);
  }

  @Delete(':id')
  @UsePipes(new MongoIdValidationPipe())
  delete(@Param('id') id: string) {
    return this.appVersionService.delete(id);
  }
}
