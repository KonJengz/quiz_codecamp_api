import { RoleEnum, User } from 'src/resources/users/domain/user.domain';
import { JwtPayloadType } from './payload.type';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface HttpRequestWithUser extends Request {
  user: {
    userId: User['id'];
    role: RoleEnum;
  };
}
