import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

/*IsStringOrNumber decorator*/
@ValidatorConstraint({ name: 'IsStringOrNumber', async: false })
export class IsStringOrNumberConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const isValidString = typeof value === 'string';
    const isValidNumber = typeof value === 'number';
    return isValidString || isValidNumber;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be either a string or a number`;
  }
}
export function IsStringOrNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsStringOrNumberConstraint,
    });
  };
}