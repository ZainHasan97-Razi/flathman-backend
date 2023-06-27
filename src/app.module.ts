import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { RuleModule } from './rules/rule.module';
import { SubscriptionModule } from './subscription/userSubscription/subscription.module';
import { SubscriptionTypeModule } from './subscription/subscriptionType/subscriptionType.module';
import { TeamModulebb } from './team/teams.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationMiddleware } from './middleware';
import { AuthModule } from './auth/auth.module';
import { OpponentPlayerModule } from './opponentPlayer/oppPlayer.module';
import { OpponentTeamModulebb } from './opponentTeam/oppTeam.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://flethmangeneburaaq:flethmangeneburaaq123@cluster0.zk6j3.mongodb.net/flethman?retryWrites=true&w=majority',
      // `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.zk6j3.mongodb.net/flethman?retryWrites=true&w=majority`,
    ),
    AdminModule,
    UserModule,
    AuthModule,
    TeamModulebb,
    PlayerModule,
    MatchModule,
    RuleModule,
    SubscriptionModule,
    SubscriptionTypeModule,
    OpponentPlayerModule,
    OpponentTeamModulebb,
    ColorModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/signup', method: RequestMethod.ALL },
        // { path: 'admin/createUser', method: RequestMethod.ALL },
        // { path: 'admin/createRule', method: RequestMethod.ALL },
        // { path: 'admin/createTeam', method: RequestMethod.ALL },
        // { path: 'admin/createPlayer', method: RequestMethod.ALL },
        // { path: 'admin/createSubscription', method: RequestMethod.ALL },
        // { path: 'admin/create-subscription-type', method: RequestMethod.ALL },
        // { path: 'admin/updateRule', method: RequestMethod.ALL },
        // { path: 'admin/updateUser', method: RequestMethod.ALL },
        // { path: 'admin/updateTeam', method: RequestMethod.ALL },
        // { path: 'admin/updatePlayer', method: RequestMethod.ALL },
        // { path: 'rule', method: RequestMethod.ALL },
        // { path: 'rule/:id', method: RequestMethod.ALL },
        // { path: 'team', method: RequestMethod.ALL },
        // { path: 'team/:id', method: RequestMethod.ALL },
        // { path: 'team/my/:id', method: RequestMethod.ALL },
        // { path: 'user', method: RequestMethod.ALL },
        // { path: 'user/:id', method: RequestMethod.ALL },
        // { path: 'player', method: RequestMethod.ALL },
        // { path: 'player/create', method: RequestMethod.ALL },
        // { path: 'player/:id', method: RequestMethod.ALL },
        // { path: 'player/my/:id', method: RequestMethod.ALL },
        // { path: 'subscription', method: RequestMethod.ALL },
        // { path: 'subscription/:id', method: RequestMethod.ALL },
        // { path: 'subscription-type', method: RequestMethod.ALL },
        // { path: 'subscription-type/:id', method: RequestMethod.ALL },
        // { path: 'admin/create-subscription-type', method: RequestMethod.ALL },
        // { path: 'color/create', method: RequestMethod.ALL },
        // { path: 'color', method: RequestMethod.ALL },
        // { path: 'admin/contact-us', method: RequestMethod.ALL },
        {
          path: 'opponentTeam/by-licensed-team/:id',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
