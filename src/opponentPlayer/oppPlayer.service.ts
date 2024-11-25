import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOpponentPlayerDto } from './dto/create.oppPlayer.dto';
import { CreateOpponentTeamDto } from 'src/opponentTeam/dto/create.oppTeam.dto';
import { OpponentTeamService } from 'src/opponentTeam/oppTeam.services';
import { UpdateOpponentPlayerDto } from './dto/update.oppPlayer.dto';

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
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.oppPlayerModel.findById(id);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findTeamPlayers(id: string) {
    try {
      const response = await this.oppPlayerModel.find({ teamId: id }).exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async createPlayer(data: CreateOpponentPlayerDto) {
    try {
      const team = await this.oppTeamModel.findById(data.teamId);
      if (!team) {
        throw new ConflictException(`Team you have selected doesn't exist`);
      }
      const playerNumberAlreadyExist = await this.oppPlayerModel.findOne({
        playerNumber: data.playerNumber,
        teamId: data.teamId,
      });
      if (playerNumberAlreadyExist) {
        throw new BadRequestException(`Player number already exist`);
      }
      data.playerName =
        data.firstName.split(' ').join('') +
        ' ' +
        data.lastName.split(' ').join('');
      const createdPlayer = await this.oppPlayerModel.create(data);
      return createdPlayer;
    } catch (e) {
      throw e;
    }
  }

  async updatePlayer(data: UpdateOpponentPlayerDto) {
    try {
      const player = await this.oppPlayerModel.findOne({
        _id: data.playerId,
      });
      if (!player) {
        throw new NotFoundException(`Player ${data.playerName} doesn't exist`);
      }
      await this.oppPlayerModel.findByIdAndUpdate({ _id: data.playerId }, data);
      if(data?.firstName && data?.lastName) {
        data.playerName =
          data.firstName.split(' ').join('') +
          ' ' +
          data.lastName.split(' ').join('');
      }
      return { message: 'Player has been updated successfully!' };
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.oppPlayerModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}
