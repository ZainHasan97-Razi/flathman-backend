import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';
import { TeamService } from 'src/team/teams.services';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { CreatePlayerDto } from 'src/player/dto/create.player.dto';
import { PlayerService } from 'src/player/player.service';
import { RuleService } from 'src/rules/rule.service';
import { CreateRuleDto } from 'src/rules/dto/create.rule.dto';
import { SubscriptionService } from 'src/subscription/userSubscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription/dto/create.subscription.dto';
import { UpdateSubscriptionDto } from 'src/subscription/dto/update.subscription.dto';
import { SubscriptionTypeService } from 'src/subscription/subscriptionType/subscriptionType.service';
import { CreateSubscriptionTypeDto } from 'src/subscription/dto/create.subscriptiontype.dto';
import { UpdateRuleDto } from 'src/rules/dto/update.rule.dto';
import { UpdateUserDto } from 'src/user/dto/update.user.dto';
import { UpdateTeamDto } from 'src/team/dto/update.team.dto';
import { UpdatePlayerDto } from 'src/player/dto/update.player.dto';
import { SubscriptionModelDto } from 'src/subscription/dto/subscription.model.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly authService: AuthService,
    private readonly playerService: PlayerService,
    private readonly ruleService: RuleService,
    private readonly subscription: SubscriptionService,
    private readonly subscriptionType: SubscriptionTypeService,
  ) {}

  async CreateUser(body: CreateUserDto) {
    return await this.authService.Create(body);
  }
  async UpdateUser(body: UpdateUserDto) {
    return await this.authService.Update(body);
  }
  async DeleteUser(id: string) {
    const user = await this.userService.findOne(id);
    if (user) {
      // delete all user teams and players
      let myTeams = await this.teamService.findMyTeam(id);
      myTeams.map(async (v) => {
        await this.teamService.delete(String(v._id));
      });

      // delete all user subscriptions
      let userSubscriptions = await this.subscription.getMySubscriptions({
        userId: id,
      });
      userSubscriptions.map(async (v) => {
        await this.subscription.delete(v._id.toString());
      });
    }
    return await this.userService.delete(id);
  }

  async CreateTeam(body: CreateTeamDto) {
    return await this.teamService.createTeam(body);
  }
  async UpdateTeam(body: UpdateTeamDto) {
    return await this.teamService.updateTeam(body);
  }

  async CreatePlayer(body: CreatePlayerDto) {
    return await this.playerService.createPlayer(body);
  }
  async UpdatePlayer(body: UpdatePlayerDto) {
    return await this.playerService.updatePlayer(body);
  }

  async CreateRule(body: CreateRuleDto) {
    return await this.ruleService.createRule(body);
  }
  async UpdateRule(body: UpdateRuleDto) {
    return await this.ruleService.updateRule(body);
  }

  async CreateSubscription(body: CreateSubscriptionDto) {
    return await this.subscription.create(body);
  }
  async UpdateSubscription(body: UpdateSubscriptionDto) {
    return await this.subscription.update(body);
  }

  async CreateSubscriptionType(body: CreateSubscriptionTypeDto) {
    return await this.subscriptionType.create(body);
  }
  async DeleteSubscriptionType(id: string) {
    console.log('id at admin.serviceeee => ', id);

    return await this.subscriptionType.delete(id);
  }

  ContactUs() {
    return {
      contacts: [
        { number: '17-(48)003-728', type: 'num1' },
        { number: '17-(48)003-999', type: 'num2' },
      ],
      email: 'gene.flathman@laxstat.com',
      webUrl: 'https://flathman-web.web.app/',
    };
  }
}
