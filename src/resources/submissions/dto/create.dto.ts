import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Question } from 'src/resources/questions/domain/question.domain';

export class CreateSubmissionsDto {
  @ApiProperty({ type: String, description: 'Question ID.' })
  @IsString()
  questionId: Question['id'];

  @ApiProperty({ type: String, description: 'User input code for submit' })
  @IsString()
  code: string;
}
