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
// import
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
      throw new NotFoundException(`Couldn't found any players`);
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.playerModel.findById(id);
      return response;
    } catch (e) {
      // console.log(e);
      throw new NotFoundException(`Couldn't found any player`);
    }
  }

  async findTeamPlayers(id: string) {
    try {
      const response = await this.playerModel.find({ teamId: id }).exec();
      return response;
    } catch (e) {
      throw new NotFoundException(`Couldn't found team's Player`);
    }
  }

  async createPlayer(data: CreatePlayerDto) {
    try {
      if (String(data.phone).length !== 10 || isNaN(Number(data.phone))) {
        throw new BadRequestException(
          'Invalid phone number, should be of 10 characters and numeric',
        );
      }
      const player = await this.playerModel.findOne({ phone: data.phone });
      if (player) {
        throw new ConflictException('Player phone is already used');
      }
      const team = await this.teamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Team you have selected doesn't exist`);
      }
      const teamPlayers = await this.playerModel.find({ teamId: data.teamId });
      if (teamPlayers.length < 10) {
        // Adding created player to the team schema object
        const createdPlayer = await this.playerModel.create(data);
        return createdPlayer;
      } else {
        throw new ConflictException(`Can't add players anymore to this team`);
      }
    } catch (e) {
      // console.log('Err createTeam => ', e);
      throw new BadRequestException('Failed to create player:', e);
    }
  }

  async updatePlayer(data: UpdatePlayerDto) {
    try {
      if (
        (data?.phone && String(data.phone).length !== 10) ||
        isNaN(Number(data.phone))
      ) {
        throw new BadRequestException(
          'Invalid phone number, should be of 10 characters and numeric',
        );
      }
      const team = await this.teamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Team you have selected doesn't exist`); // Jabhi tw change krega banda jab new teamId exist krti hogi
      }
      const player = await this.playerModel.findOne({
        _id: data.playerId,
      });
      if (!player) {
        throw new NotFoundException(`Player ${data.playerName} doesn't exist`);
      }
      const updatedPlayer = await this.playerModel.findByIdAndUpdate(
        { _id: data.playerId },
        data,
      );
      if (updatedPlayer) {
        return { message: 'Player has been updated successfully!' };
      }
    } catch (e) {
      // throw new BadRequestException(`Request failed: Couldn't update player`);
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.playerModel.findOneAndDelete({ teamId: id });
      console.log('resp at delete player', response);
    } catch (e) {
      throw e;
    }
  }
}
