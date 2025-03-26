import { Controller } from '@nestjs/common';
import { userPath } from 'src/common/path';
import { QuestionsService } from './questions.service';

@Controller({ version: 'v1', path: userPath.base })
export class QuestionsController {
  constructor(questionsService: QuestionsService) {}
}
