import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Question } from 'src/resources/questions/domain/question.domain';
import { User } from 'src/resources/users/domain/user.domain';

export class Submissions extends BaseDomain {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  userId: User['id'];

  @ApiProperty({ type: String })
  questionId: Question['id'];

  @ApiProperty({ type: String })
  code: string;
}
