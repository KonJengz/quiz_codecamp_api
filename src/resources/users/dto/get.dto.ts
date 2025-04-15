import { CoreApiResponse } from 'src/core/api-response';
import { User } from '../domain/user.domain';
import { ApiProperty } from '@nestjs/swagger';

export class GetManyUsersResponse extends CoreApiResponse<User[]> {
  @ApiProperty({ type: [User] })
  data: User[];
}

export class GetMeResponse extends CoreApiResponse<User> {
  @ApiProperty({ type: User })
  data: User;
}

export class GetUserByIdResponse extends CoreApiResponse<User> {
  @ApiProperty({ type: User })
  data: User;
}
