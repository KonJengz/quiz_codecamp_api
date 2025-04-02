import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ExecuteDto {
  @ApiProperty({ type: String })
  @IsString()
  code: string;
}
