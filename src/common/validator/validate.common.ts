import { Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
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