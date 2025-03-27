import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';

type CategoryInputConstructor = Category;

export class Category extends BaseDomain {
  @ApiProperty({ type: String, example: 'Array' })
  name: string;
  @ApiProperty({ type: Boolean, example: 'false' })
  isChallenge: boolean;

  constructor({
    id,
    name,
    isChallenge,
    createdAt,
    updatedAt,
    deletedAt,
  }: CategoryInputConstructor) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.name = name;
    this.isChallenge = isChallenge;
  }
}
