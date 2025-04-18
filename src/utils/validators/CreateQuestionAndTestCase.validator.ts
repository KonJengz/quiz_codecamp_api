import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';
import { createTestCaseHelper } from 'src/resources/test-cases/helper/test-cases.helper';

@ValidatorConstraint({
  name: 'CreateQuestionAndTestCaseConstraint',
  async: false,
})
export class CreateQuestionAndTestCaseConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args?: ValidationArguments): Promise<boolean> | boolean {
    const classObj = args.object as Function;
    const isFunction = classObj[CreateQuestionDto.isFunctionFieldName];

    const testCases = classObj[CreateQuestionDto.testCasesFieldName];

    const solution = classObj[CreateQuestionDto.solutionFieldName];

    const { isValid } = createTestCaseHelper(testCases, isFunction, solution);

    console.log('isValid', isValid);

    return isValid;
  }

  defaultMessage(args?: ValidationArguments): string {
    const classObj = args.object as Function;
    const isFunction = classObj[CreateQuestionDto.isFunctionFieldName];

    const solution = classObj[CreateQuestionDto.solutionFieldName];

    const testCases = classObj[CreateQuestionDto.testCasesFieldName];

    const { detail } = createTestCaseHelper(testCases, isFunction, solution);
    return detail;
  }
}

export function CreateQuestionAndTestCaseValidator() {
  return function (constructor: Function) {
    registerDecorator({
      target: constructor,
      name: 'CreateQuestionAndTestCaseValidator',
      validator: CreateQuestionAndTestCaseConstraint,
      propertyName: '__class__',
    });
  };
}
