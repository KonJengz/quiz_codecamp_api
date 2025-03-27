import { Module } from '@nestjs/common';
import { AtleastOnePropertyConstraint } from './AtleastOneProp';

@Module({
  providers: [AtleastOnePropertyConstraint],
  exports: [AtleastOnePropertyConstraint],
})
export class CustomValidatorModule {}
