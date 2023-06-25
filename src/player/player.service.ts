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
import { CreatePlayerDto } from './dto/create.player.dto';
import { UpdatePlayerDto } from './dto/update.player.dto';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';
import { TeamService } from 'src/team/teams.services';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>, // private readonly teamService: TeamService,
  ) {}

  async findAll() {
    try {
      const response = await this.playerModel.find().exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any players`);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.playerModel.findById(id);
      return response;
    } catch (e) {
      // console.log(e);
      // throw new NotFoundException(`Couldn't found any player`);
      throw e;
    }
  }

  async findTeamPlayers(id: string) {
    try {
      const response = await this.playerModel.find({ teamId: id }).exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found team's Player`);
      throw e;
    }
  }

  async createPlayer(data: CreatePlayerDto) {
    try {
      const team = await this.teamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Invalid team!`);
      }
      const homeJerseyAlreadyExist = await this.playerModel.findOne({
        homeJersey: data.homeJersey,
        teamId: data.teamId,
      });
      if (homeJerseyAlreadyExist) {
        throw new BadRequestException('Home Jersey already exist!');
      }
      const awayJerseyAlreadyExist = await this.playerModel.findOne({
        awayJersey: data.awayJersey,
        teamId: data.teamId,
      });
      if (awayJerseyAlreadyExist) {
        throw new BadRequestException('Away Jersey already exist!');
      }
      const createdPlayer = await this.playerModel.create(data);
      return createdPlayer;
    } catch (e) {
      throw e;
    }
  }

  async updatePlayer(data: UpdatePlayerDto) {
    try {
      const team = await this.teamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Team you have selected doesn't exist`); // Jabhi tw change krega banda jab new teamId exist krti hogi
      }
      const homeJerseyAlreadyExist = await this.playerModel.findOne({
        _id: { $ne: data.playerId },
        homeJersey: data.homeJersey,
        teamId: data.teamId,
      });
      if (homeJerseyAlreadyExist) {
        throw new BadRequestException('Home Jersey already exist!');
      }
      const awayJerseyAlreadyExist = await this.playerModel.findOne({
        _id: { $ne: data.playerId },
        awayJersey: data.awayJersey,
        teamId: data.teamId,
      });
      if (awayJerseyAlreadyExist) {
        throw new BadRequestException('Away Jersey already exist!');
      }
      const player = await this.playerModel.findOne({
        _id: data.playerId,
      });
      if (!player) {
        throw new NotFoundException(`Player ${data.playerName} doesn't exist`);
      }
      await this.playerModel.findByIdAndUpdate({ _id: data.playerId }, data);
      return { message: 'Player has been updated successfully!' };
    } catch (e) {
      // throw new BadRequestException(`Request failed: Couldn't update player`);
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.playerModel.findByIdAndDelete(id);
      console.log('resp at delete player', response);
    } catch (e) {
      throw e;
    }
  }
}
