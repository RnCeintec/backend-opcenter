import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class isPhoneNumberConstraint implements ValidatorConstraintInterface {
    validate(value: string, _: ValidationArguments) {
      const trim = value?.trim();
      return trim !== '' ? value === trim && /^([0-9]{9})$/.test(trim) : true;
    }
  }
  
  export function isPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: isPhoneNumberConstraint,
      });
    };
  }
  