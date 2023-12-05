import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOpponentTeamDto } from './dto/create.oppTeam.dto';
import { RuleService } from 'src/rules/rule.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { OpponentPlayerService } from 'src/opponentPlayer/oppPlayer.service';
import { CreateOpponentPlayerDto } from 'src/opponentPlayer/dto/create.oppPlayer.dto';
import { UpdateOppTeamDto } from './dto/update.oppTeam.dto';
import { CreateTeamDto } from 'src/team/dto/create.team.dto';
import { TeamService } from 'src/team/teams.services';

@Injectable()
export class OpponentTeamService {
  constructor(
    @InjectModel('OpponentTeam')
    private opponentTeamModel: Model<CreateOpponentTeamDto>,
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    @InjectModel('OpponentPlayer')
    private oppPlayerModel: Model<CreateOpponentPlayerDto>,
    // private readonly ruleService: RuleService,
    private readonly oppPlayerService: OpponentPlayerService,

    // @InjectModel('Team') private teamModel: Model<CreateUserDto>,
    private readonly teamService: TeamService,
  ) {}

  async findAll() {
    try {
      const response = await this.opponentTeamModel.find().exec();
      return response;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      const team = await this.findOne(id);
      if (team) {
        const deletedTeam = await this.opponentTeamModel.findByIdAndDelete(id);
        if (!deletedTeam) {
          throw new InternalServerErrorException(`Couldn't delete team`);
        }
        const teamPlayers = await this.oppPlayerModel.find({ teamId: id });
        // const teamPlayers = await this.playerService.findTeamPlayers(id);
        if (teamPlayers) {
          teamPlayers.map(async (v) => {
            await this.oppPlayerService.delete(id);
          });
        }
        const remainingPlayers = await this.oppPlayerModel.find({ teamId: id });
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
      const response = await this.opponentTeamModel.findById(id);
      //.populate('gameRules');

      //Maximillian
      // populate('cart.items.productId')
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findMyTeam(id: string) {
    try {
      const response = await this.opponentTeamModel.find({ teamOwner: id });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async findOppteamsOfLicensedTeam(id: String) {
    try {
      // await this.licensedTeamExist(id);
      return await this.opponentTeamModel.find({ licensedTeam: id });
    } catch (e) {
      throw e;
    }
  }

  async createTeam(data: CreateOpponentTeamDto) {
    try {
      await this.teamOwnerExist(data.teamOwner);
      const createdTeam = await this.opponentTeamModel.create(data);
      return createdTeam;
    } catch (e) {
      throw e;
    }
  }

  async updateTeam(data: UpdateOppTeamDto) {
    try {
      const teamId = data.teamId;
      let team = await this.opponentTeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException(`Team ${data.teamNickName} doesn't exist`);
      }
      await this.opponentTeamModel.findOneAndUpdate(
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
      throw e;
    }
  }

  teamnameIsUnique = async (teamname: string) => {
    const result = await this.opponentTeamModel.findOne({ teamName: teamname });
    if (result) {
      throw new ConflictException('Team name already exist!');
    }
  };

  teamOwnerExist = async (ownerId: string) => {
    const result = await this.userModel.findOne({
      teamOwner: ownerId,
      deletedAt: null,
    });
    if (!result) {
      throw new ConflictException(`Team owner doesn't exist!`);
    }
  };

  // licensedTeamExist = async (id: String) => {
  //   let licensedTeam = await this.teamModel.findById(id);
  //   if (!licensedTeam) {
  //     throw new BadRequestException('Invalid licensed team!');
  //   }
  // };
}
