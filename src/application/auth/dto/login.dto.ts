import { ApiProperty } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/core/api-response';
import { User } from 'src/resources/users/domain/user.domain';

export class AuthLoginData {
  @ApiProperty({ type: String })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class AuthLoginDto {
  username: User['username'];
  password: User['password'];
}

export class AuthLoginResponse extends CoreApiResponse<AuthLoginData> {
  @ApiProperty({ type: () => AuthLoginData })
  public data: AuthLoginData;
}
