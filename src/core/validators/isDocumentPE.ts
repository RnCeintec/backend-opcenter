import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class isDocumentPEConstraint implements ValidatorConstraintInterface {
    validate(value: string, _: ValidationArguments) {
      const trim = value?.trim();
      return trim !== ''
        ? value === trim && /^(([0-9]{8})|([0-9]{11}))$|([0-9]{9}))$/.test(trim)
        : true;
    }
  }
  
  export function isDocumentPE(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: isDocumentPEConstraint,
      });
    };
  }