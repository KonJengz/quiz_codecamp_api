import { Controller } from '@nestjs/common';
import { userPath } from 'src/common/path';

@Controller({ version: '1', path: userPath.base })
export class UsersController {}
