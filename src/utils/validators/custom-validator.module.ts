import { Module } from '@nestjs/common';
import { AtleastOnePropertyConstraint } from './AtleastOneProp';
import { CreateQuestionAndTestCaseConstraint } from './CreateQuestionAndTestCase.validator';

@Module({
  providers: [
    AtleastOnePropertyConstraint,
    CreateQuestionAndTestCaseConstraint,
  ],
  exports: [AtleastOnePropertyConstraint, CreateQuestionAndTestCaseConstraint],
})
export class CustomValidatorModule {}
