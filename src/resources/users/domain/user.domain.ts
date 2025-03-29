import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { isNumber } from 'class-validator';
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

  @ApiProperty({ type: Number, nullable: true })
  totalSolvedQuizzes?: number = 0;
  @ApiProperty({ type: Number, nullable: true })
  totalSolvedChallenges?: number = 0;

  constructor({
    id,
    password,
    username,
    createdAt,
    deletedAt,
    updatedAt,
    totalSolvedChallenges,
    totalSolvedQuizzes,
  }: {
    id: User['id'];
    username: User['username'];
    createdAt: User['createdAt'];
    updatedAt: User['updatedAt'];
    deletedAt?: User['deletedAt'];
    password?: User['password'];
    totalSolvedChallenges?: User['totalSolvedChallenges'];
    totalSolvedQuizzes?: User['totalSolvedQuizzes'];
  }) {
    super({ createdAt, id, updatedAt, deletedAt });
    this.username = username;
    if (password) this.password = password;
    if (isNumber(totalSolvedQuizzes))
      this.totalSolvedQuizzes = totalSolvedQuizzes;
    if (isNumber(totalSolvedChallenges))
      this.totalSolvedChallenges = totalSolvedChallenges;
  }
}
