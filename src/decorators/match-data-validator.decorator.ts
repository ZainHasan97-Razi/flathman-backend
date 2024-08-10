import {
  isArray,
  isNotEmpty,
  isObject,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GameResultEnum, GameResultEnumType, GameStatusEnum, GameStatusEnumType } from 'src/match/match.model';
import {
  IsDateFormatConstraint,
  IsTimeFormatConstraint,
} from './date-time.decorator';
import { getCurrentFormattedDateTime } from 'src/constants/constant.functions';
const isEmpty = require("is-empty");

@ValidatorConstraint({ name: 'ValidateDataUponMatchStatus', async: false })
export class ValidateDataUponMatchStatusConstraint
  implements ValidatorConstraintInterface
{
  validate(gameStatus: GameStatusEnumType, args: ValidationArguments) {
    if (gameStatus === GameStatusEnum.scheduled) {
      const { date, time, homeTeam, awayTeam, conference } = args.object as any;
      const dateValid = new IsDateFormatConstraint().validate(date);
      const timeValid = new IsTimeFormatConstraint().validate(time);
      if (dateValid && timeValid && homeTeam && awayTeam && conference !== null) {
        const [month, day, year] = date.split('-');
        const [hour, minute] = time.split(':');
        const effectiveDateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
        args.object["effectiveDateTime"] = Math.floor(effectiveDateTime.getTime() / 1000); // Convert to Unix timestamp in seconds
        return true; // no error
      } else {
        return false;
      }
    }
    // console.log('cominggggggggg here', gameStatus, args.object["gameResult"]);
    if (gameStatus === GameStatusEnum.completed) {
      const { teamA, teamB, general, rules, activityLog } = args.object as any;
      if (Number(teamA.goals) === Number(teamB.goals)) { // team.goals are default = 0 from frontend
        teamA.status = GameResultEnum.Tied;
        teamB.status = GameResultEnum.Tied;
        args.object["gameResult"] = GameResultEnum.Tied as GameResultEnumType;
        // console.log("case 4");
      } else if (Number(teamA.goals) > Number(teamB.goals)) {
        teamA.status = GameResultEnum.Won;
        teamB.status = GameResultEnum.Lost;
        args.object["gameResult"] = GameResultEnum.Won as GameResultEnumType;
        // console.log("case 5");
      } else if (Number(teamA.goals) < Number(teamB.goals)) {
        teamA.status = GameResultEnum.Lost;
        teamB.status = GameResultEnum.Won;
        args.object["gameResult"] = GameResultEnum.Lost as GameResultEnumType;
        // console.log("case 6");
      }
      if (isObject(teamA) && isObject(teamB) && isObject(general) && isObject(rules) && isNotEmpty(rules) && isArray(activityLog)) {
        const {date, time} = getCurrentFormattedDateTime();
        const [month, day, year] = date.split('-');
        const [hour, minute] = time.split(':');
        args.object["date"] = date;
        args.object["time"] = time;
        const effectiveDateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
        // (args.object as any).effectiveDateTime = Math.floor(effectiveDateTime.getTime() / 1000); // Convert to Unix timestamp in seconds
        args.object["effectiveDateTime"] = Math.floor(effectiveDateTime.getTime() / 1000); // Convert to Unix timestamp in seconds
        // console.log("cominggggggggggggggggg");
        return true; // no error
      } else {
        return false;
      }
    }
    
    // if(gameStatus === MatchStatusEnum.forfeit) {}

    return false; // error
  }

  defaultMessage() {
    return 'Validation for create game failed!';
  }
}
export function ValidateDataUponMatchStatus(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateDataUponMatchStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateDataUponMatchStatusConstraint,
    });
  };
}
