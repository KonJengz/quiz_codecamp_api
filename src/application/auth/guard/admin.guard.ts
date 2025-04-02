<<<<<<< HEAD
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
=======
import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
>>>>>>> origin/main
import { HttpRequestWithUser } from 'src/common/types/http.type';
import { ErrorApiResponse } from 'src/core/error-response';
import { RoleEnum } from 'src/resources/users/domain/user.domain';
import { ObjectHelper } from 'src/utils/object.helper';

<<<<<<< HEAD
@Injectable()
=======
>>>>>>> origin/main
export class AdminGuard implements CanActivate {
  private logger: Logger = new Logger(AdminGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: HttpRequestWithUser = context.switchToHttp().getRequest();

    if (!request || ObjectHelper.isEmpty(request.user)) {
      this.logger.log(`The request is not valid`);

      throw ErrorApiResponse.unauthorized();
    }

    if (request.user.role !== RoleEnum.Admin) {
      this.logger.log(
        `The request from user ID ${request.user.userId} is not an admin`,
      );
      throw ErrorApiResponse.unauthorized(
        `The request from user ID ${request.user.userId} is not an admin`,
      );
    }

    return true;
  }
}
