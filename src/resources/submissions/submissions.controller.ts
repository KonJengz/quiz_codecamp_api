import { Controller } from '@nestjs/common';
import { submissionsPath } from 'src/common/path';

@Controller({ path: submissionsPath.base, version: '1' })
export class SubmissionsController {}
