import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
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
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(6)
  username: User['username'];
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(6)
  password: User['password'];
}

export class AuthLoginResponse extends CoreApiResponse<AuthLoginData> {
  @ApiProperty({
    type: () => AuthLoginData,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ZlNTI5MDkzMjhjMDAyZmY3NzI0MzciLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc0NDg2NDAzMCwiZXhwIjoxNzQ1MTIzMjMwfQ.rmYDeKduSav_zXdAda5wHywUssb-IegEdVLstjKPrxw',
  })
  public data: AuthLoginData;
}
