import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum, User } from '../domain/user.domain';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  username: User['username'];
  @ApiProperty({ type: String })
  @IsString()
  password: User['password'];
  @ApiProperty({ enum: RoleEnum })
  role: User['role'];
}
