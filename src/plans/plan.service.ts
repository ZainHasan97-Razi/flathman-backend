import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
// import { TEAM_SCHEMA_TYPE } from './team.model';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreatePlayerDto } from './dto/create.player.dto';
// import { UpdatePlayerDto } from './dto/update.player.dto';
// import { CreateTeamDto } from 'src/team/dto/create.team.dto';
// import { TeamService } from 'src/team/teams.services';

@Injectable()
export class PlanService {
  constructor(
    // @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
    // @InjectModel('Team') private teamModel: Model<CreateTeamDto>, // private readonly teamService: TeamService,
  ) {}

//   async findAll() {
//     try {
//       const response = await this.playerModel.find().exec();
//       return response;
//     } catch (e) {
//       throw e;
//     }
//   }

//   async findOne(id: string) {
//     try {
//       const response = await this.playerModel.findById(id);
//       return response;
//     } catch (e) {
//       throw e;
//     }
//   }

//   async delete(id: string) {
//     try {
//       const response = await this.playerModel.findByIdAndDelete(id);
//       console.log('resp at delete player', response);
//     } catch (e) {
//       throw e;
//     }
//   }
}
