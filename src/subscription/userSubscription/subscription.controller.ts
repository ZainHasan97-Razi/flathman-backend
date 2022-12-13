import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { UpdateSubscriptionOnEndGameDto } from '../dto/update.subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // @Get()
  // findAll() {
  //   return this.subscriptionService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Post('myall')
  findMyAllSubscription(@Body() body) {
    return this.subscriptionService.getMyAllSubscription(body);
  }

  @Post('my')
  findMySubscription(@Body() body) {
    // console.log('findMySubscription id =>>> ', body);
    return this.subscriptionService.getMySubscriptions(body);
    // return [];
  }

  @Patch('update-usage-count')
  updateCount(@Body() body: UpdateSubscriptionOnEndGameDto) {
    return this.subscriptionService.updateTimesUsedOnGameEnd(body);
  }

  @Patch('update-subscription-team')
  updateSUbscriptionTeam(
    @Body() body: { teamId: string; subscriptionId: string },
  ) {
    // console.log('bodyyy', body);
    return this.subscriptionService.assignTeamASubscription(body);
  }

  // @Get('my')
  // findMySubscription(@Req() req: Request) {
  //   console.log('findMySubscription id =>>> ', req);
  //   return this.subscriptionService.getMySubscriptions(req);
  // }
}
