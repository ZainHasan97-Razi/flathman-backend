import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from 'src/player/dto/create.player.dto';
import { UpdatePlayerDto } from 'src/player/dto/update.player.dto';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CreateRuleDto } from 'src/rules/dto/create.rule.dto';
import { AdminService } from './admin.services';
import { CreateSubscriptionDto } from 'src/subscription/dto/create.subscription.dto';
import { CreateSubscriptionTypeDto } from 'src/subscription/dto/create.subscriptiontype.dto';
import { UpdateRuleDto } from 'src/rules/dto/update.rule.dto';
import { UpdateSubscriptionDto } from 'src/subscription/dto/update.subscription.dto';
import { UpdateUserDto } from 'src/user/dto/update.user.dto';
import { UpdateTeamDto } from 'src/team/dto/update.team.dto';
import { SubscriptionModelDto } from 'src/subscription/dto/subscription.model.dto';
import mongoose from 'mongoose';
import { MongoIdValidationPipe } from 'src/common/pipes/mongoid.validation.pipe';
import { CreateStatsConfigDto } from 'src/statsConfig/dto/create.statsConfig.dto';
import { UpdateStatsConfigDto } from 'src/statsConfig/dto/update.statsConfig.dto';
import { MongoIdType } from 'src/common/common.types';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Post('createUser')
  createUser(@Body() body: CreateUserDto) {
    return this.adminService.CreateUser(body);
  }
  @Patch('updateUser')
  updateUser(@Body() body: UpdateUserDto) {
    return this.adminService.UpdateUser(body);
  }
  @Delete('deleteUser/:id')
  deleteUser(@Param('id', MongoIdValidationPipe) id: mongoose.Types.ObjectId) {
    return this.adminService.DeleteUser(id);
  }

  @Post('createTeam')
  createTeam(@Body() body: CreateTeamDto) {
    return this.adminService.CreateTeam(body);
  }
  @Patch('updateTeam')
  updateTeam(@Body() body: UpdateTeamDto) {
    return this.adminService.UpdateTeam(body);
  }

  @Post('createPlayer')
  createPlayer(@Body() body: CreatePlayerDto) {
    return this.adminService.CreatePlayer(body);
  }
  @Patch('updatePlayer')
  updatePlayer(@Body() body: UpdatePlayerDto) {
    return this.adminService.UpdatePlayer(body);
  }

  @Post('createRule')
  createRule(@Body() body: CreateRuleDto) {
    return this.adminService.CreateRule(body);
  }
  @Patch('updateRule')
  updateRule(@Body() body: UpdateRuleDto) {
    return this.adminService.UpdateRule(body);
  }

  @Post('createSubscription')
  createSubscription(@Body() body: CreateSubscriptionDto) {
    return this.adminService.CreateSubscription(body);
  }
  @Patch('updateSubscription')
  updateSubscription(@Body() body: UpdateSubscriptionDto) {
    return this.adminService.UpdateSubscription(body);
  }

  @Post('create-subscription-type')
  createSubscriptionType(@Body() body: CreateSubscriptionTypeDto) {
    return this.adminService.CreateSubscriptionType(body);
  }

  @Delete('delete-subscription-type/:id')
  deleteSubscriptionType(@Param('id') id: string) {
    return this.adminService.DeleteSubscriptionType(id);
  }

  @Get('contact-us')
  contactUs() {
    return this.adminService.ContactUs();
  }

  @Post("create-stats-config")
  createStatsConfig(@Body() body: CreateStatsConfigDto) {
    return this.adminService.createStatsConfig(body);
  }

  @Patch("create-stats-config/:id")
  updateStatsConfig(@Param('id', MongoIdValidationPipe) id: MongoIdType, @Body() body: UpdateStatsConfigDto) {
    return this.adminService.updateStatsConfig(id, body);
  }
}
