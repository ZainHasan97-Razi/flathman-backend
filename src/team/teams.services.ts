import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { RuleService } from 'src/rules/rule.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { CreatePlayerDto } from 'src/player/dto/create.player.dto';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private teamModel: Model<CreateTeamDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('Player') private playerModel: Model<CreatePlayerDto>,
    private readonly ruleService: RuleService,
    private readonly playerService: PlayerService,
  ) {}

  async findAll() {
    try {
      const response = await this.teamModel.find().exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found any Team`);
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const team = await this.findOne(id);
      if (team) {
        const deletedTeam = await this.teamModel.findByIdAndDelete(id);
        if (!deletedTeam) {
          throw new InternalServerErrorException(`Couldn't delete team`);
        }
        const teamPlayers = await this.playerModel.find({ teamId: id });
        // const teamPlayers = await this.playerService.findTeamPlayers(id);
        if (teamPlayers) {
          teamPlayers.map(async (v) => {
            await this.playerService.delete(id);
          });
        }
        const remainingPlayers = await this.playerModel.find({ teamId: id });
        // const remainingPlayers = await this.playerService.findTeamPlayers(id);
        if (remainingPlayers.length === 0) {
          return `All players of team deletd successfully`;
        }
      }
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.teamModel.findById(id).populate('gameRules');
      //Maximillian
      if (!response) {
        throw new NotFoundException(`Couldn't found any team`);
      } else {
        return response;
      }
    } catch (e) {
      // console.log('FingOne team Err ==>>>>>  ', e);
      throw e;
    }
  }

  async findMyTeam(id: string) {
    try {
      const response = await this.teamModel.find({ teamOwner: id }).exec();
      return response;
    } catch (e) {
      // throw new NotFoundException(`Couldn't found user's Team`);
      throw e;
    }
  }

  async createTeam(data: CreateTeamDto) {
    try {
      // await this.teamnameIsUnique(data.teamName);
      await this.teamOwnerExist(data.teamOwner);

      const createdTeam = await this.teamModel.create(data);

      return createdTeam;
    } catch (e) {
      // console.log('Err createTeam => ', e);
      // throw new BadRequestException(e?.message);
      throw e;
    }
  }

  async updateTeam(data: UpdateTeamDto) {
    try {
      // if (
      //   (data?.coachCell && data.coachCell.length !== 10) ||
      //   isNaN(Number(data.coachCell))
      // ) {
      //   throw new BadRequestException(
      //     'Invalid Coach cell, number should be of 10 characters and numeric',
      //   );
      // }
      const teamId = data.teamId;
      let team = await this.teamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException(`Team ${data.teamNickName} doesn't exist`);
      }
      // const updatedTeam = await this.teamModel.findOneAndUpdate(
      await this.teamModel.findOneAndUpdate(
        { _id: teamId }, // filter team with _id
        {
          // Data to update
          // teamName: data?.teamName ? data.teamName : team.teamName,
          // teamNickName: data?.teamNickName
          //   ? data.teamNickName
          //   : team.teamNickName,
          ...data,
        },
      );
      return { message: 'Team has been updated successfully!' };
    } catch (e) {
      // console.log('Err at updateTeam => ', e?.message);
      // throw new BadRequestException(e?.message);
      throw e;
    }
  }

  teamnameIsUnique = async (teamname: string) => {
    const result = await this.teamModel.findOne({ teamName: teamname });
    if (result) {
      throw new ConflictException('Team name already exist!');
    }
  };

  teamOwnerExist = async (ownerId: string) => {
    const result = await this.userModel.findOne({ teamOwner: ownerId });
    if (!result) {
      throw new ConflictException(`Team owner doesn't exist!`);
    }
  };
}
