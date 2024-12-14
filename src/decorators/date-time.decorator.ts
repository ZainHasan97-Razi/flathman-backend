import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Transform, TransformationType } from 'class-transformer';

@ValidatorConstraint({ async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(date: string) {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
    return regex.test(date);
  }

  defaultMessage() {
    return 'Date must be in the format MM-DD-YYYY';
  }
}
export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateFormatConstraint,
    });
  };
}

@ValidatorConstraint({ async: false })
export class IsTimeFormatConstraint implements ValidatorConstraintInterface {
  validate(time: string) {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  }

  defaultMessage() {
    return 'Time must be in the format HH:MM';
  }
}
export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeFormatConstraint,
    });
  };
}

// export function TransformToTimestamp() {
//   return Transform(({ value, obj, type }: { value: string, obj: any, type: TransformationType }) => {
//     if (type === TransformationType.PLAIN_TO_CLASS) {
//       const { date, time } = obj;
//       const [month, day, year] = date.split('-');
//       const [hour, minute] = time.split(':');
//       const timestamp = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
//       return Math.floor(timestamp.getTime() / 1000); // Convert to Unix timestamp in seconds
//     }
//     return value;
//   });
// }

@ValidatorConstraint({ name: 'TransformToTimestamp', async: false })
export class TransformToTimestampConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { date, time } = args.object as any;
    // console.log("date time::: ", date, time);
    const dateValid = new IsDateFormatConstraint().validate(date);
    const timeValid = new IsTimeFormatConstraint().validate(time);
    
    // console.log("dateValid timeValid::: ", dateValid, timeValid);
    if (dateValid && timeValid) {
      const [month, day, year] = date.split('-');
      const [hour, minute] = time.split(':');
      const effectiveDateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
      // (args.object as any).effectiveDateTime = Math.floor(effectiveDateTime.getTime() / 1000); // Convert to Unix timestamp in seconds
      // console.log("effectiveDateTime::: ", effectiveDateTime);
      args.object["effectiveDateTime"] = Math.floor(effectiveDateTime.getTime() / 1000); // Convert to Unix timestamp in seconds
      return true;
    }
    return false;
  }

  defaultMessage() {
    return 'Date must be in the format MM-DD-YYYY and time must be in the format HH:MM';
  }
}

export function TransformToTimestamp(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'TransformToTimestamp',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: TransformToTimestampConstraint,
    });
  };
}
