import { Transform } from 'class-transformer';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: false })
export class IsObjectIdArrayConstraint implements ValidatorConstraintInterface {
  validate(ids: any[]) {
    return Array.isArray(ids) && ids.every(id => Types.ObjectId.isValid(id));
  }

  defaultMessage() {
    return 'Each value in teams must be a valid MongoDB ObjectId';
  }
}
export function IsObjectIdArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdArrayConstraint,
    });

    // Register transformation
    Transform(({ value }) => {
      if (!Array.isArray(value)) return [];
      return value
        .filter(id => Types.ObjectId.isValid(id))
        .map(id => new Types.ObjectId(id));
    })(object, propertyName);
  };
}

@ValidatorConstraint({ async: false })
export class ValidatePlanDataConstraint implements ValidatorConstraintInterface {
  validate(ids: any[]) {
    return Array.isArray(ids) && ids.every(id => Types.ObjectId.isValid(id));
  }

  defaultMessage() {
    return 'Each value in teams must be a valid MongoDB ObjectId';
  }
}
export function ValidatePlanData(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdArrayConstraint,
    });

    // Register transformation
    Transform(({ value }) => {
      if (!Array.isArray(value)) return [];
      return value
        .filter(id => Types.ObjectId.isValid(id))
        .map(id => new Types.ObjectId(id));
    })(object, propertyName);
  };
}


/* IsStringArray decorator */
@ValidatorConstraint({ name: 'IsStringArray', async: false })
export class IsStringArrayConstraint implements ValidatorConstraintInterface {
  validate(values: Array<any>, args: ValidationArguments) {
    let isArray = Array.isArray(values)
    if(!isArray) {
      return false;
    }
    if(values.length === 0) return false;
    for (const value of values) {
      const isValidString = typeof value === 'string';
      if(!isValidString) return false;
      // const isValidNumber = typeof value === 'number';
      // if (!isValidString && !isValidNumber) {
      //   return false;
      // }
    }
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an array containing only strings`;
  }
}
export function IsStringArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      // name: 'isStringOrNumberArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsStringArrayConstraint,
    });
  };
}