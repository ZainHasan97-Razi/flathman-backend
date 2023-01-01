import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
// import { TEAM_SCHEMA_TYPE } from './team.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOpponentPlayerDto } from './dto/create.oppPlayer.dto';
// import { UpdatePlayerDto } from './dto/update.player.dto';
// import
import { CreateOpponentTeamDto } from 'src/opponentTeam/dto/create.oppTeam.dto';
import { OpponentTeamService } from 'src/opponentTeam/oppTeam.services';

@Injectable()
export class OpponentPlayerService {
  constructor(
    @InjectModel('OpponentPlayer')
    private oppPlayerModel: Model<CreateOpponentPlayerDto>,
    @InjectModel('OpponentTeam')
    private oppTeamModel: Model<CreateOpponentTeamDto>, // private readonly teamService: TeamService,
  ) {}

  async findAll() {
    try {
      const response = await this.oppPlayerModel.find().exec();
      return response;
    } catch (e) {
      throw new NotFoundException(`Couldn't found any players`);
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.oppPlayerModel.findById(id);
      return response;
    } catch (e) {
      // console.log(e);
      throw new NotFoundException(`Couldn't found any player`);
    }
  }

  async findTeamPlayers(id: string) {
    try {
      const response = await this.oppPlayerModel.find({ teamId: id }).exec();
      return response;
    } catch (e) {
      throw new NotFoundException(`Couldn't found team's Player`);
    }
  }

  async createPlayer(data: CreateOpponentPlayerDto) {
    try {
      // const player = await this.oppPlayerModel.findOne({ phone: data.phone });
      // if (player) {
      //   throw new ConflictException('Player phone is already used');
      // }
      const team = await this.oppTeamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Team you have selected doesn't exist`);
      }
      const teamPlayers = await this.oppPlayerModel.find({
        teamId: data.teamId,
      });
      if (teamPlayers.length < 10) {
        // Adding created player to the team schema object
        const createdPlayer = await this.oppPlayerModel.create(data);
        return createdPlayer;
      } else {
        throw new ConflictException(`Can't add players anymore to this team`);
      }
      // if (team.players.length === 11) {
      //   throw new ConflictException(`Can't add players anymore to this team`);
      // }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw new BadRequestException('Failed to create player:', e);
    }
  }

  async delete(id: string) {
    try {
      const response = await this.oppPlayerModel.findByIdAndDelete(id);
      console.log('resp at deleted opp player', response);
    } catch (e) {
      throw e;
    }
  }
}
