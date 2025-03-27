import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDomain } from 'src/common/base-domain';

export enum RoleEnum {
  Student = 'STUDENT',
  Admin = 'ADMIN',
}

export class User extends BaseDomain {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  @Expose({ toClassOnly: true })
  password: string;

  @ApiProperty({ enum: RoleEnum, type: String })
  role: RoleEnum;

  constructor({
    id,
    password,
    username,
    createdAt,
    deletedAt,
    updatedAt,
  }: {
    id: User['id'];
    username: User['username'];
    createdAt: User['createdAt'];
    updatedAt: User['updatedAt'];
    deletedAt: User['deletedAt'];
    password?: User['password'];
  }) {
    super({ createdAt, id, updatedAt, deletedAt });
    this.username = username;
    if (password) this.password = password;
  }
}
