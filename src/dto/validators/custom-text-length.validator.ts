import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextLengthValidator implements ValidatorConstraintInterface {
  validate(
    text: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    // return text.length > validationArguments.constraints[0] && text.length < validationArguments.constraints[1];
    return text.length > 1 && text.length < 10; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
