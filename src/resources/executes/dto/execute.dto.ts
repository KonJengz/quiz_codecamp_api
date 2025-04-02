import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExecuteDto {
  @ApiProperty({ type: String })
  @IsString()
  code: string;
}
