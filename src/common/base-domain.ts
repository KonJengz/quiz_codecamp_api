import { ApiProperty } from '@nestjs/swagger';
import { DateOrString } from './types/types';

export class BaseDomain {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  createdAt: DateOrString;
  @ApiProperty({ type: String })
  updatedAt: DateOrString;
  @ApiProperty({ type: String, nullable: true })
  deletedAt?: DateOrString;

  constructor({ id, createdAt, updatedAt, deletedAt }: BaseDomain) {
    this.id = id;
    this.createdAt = createdAt.toLocaleString();
    this.updatedAt = updatedAt.toLocaleString();
    if (deletedAt) this.deletedAt = deletedAt.toLocaleString();
  }
}
