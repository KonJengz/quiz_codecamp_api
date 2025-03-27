import { RoleEnum } from 'src/resources/users/domain/user.domain';

export type JwtPayloadType = {
  sub: string;
  role: RoleEnum;
};
