/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsOptional, IsString, Min, IsNumberString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'page must be a numeric string' })
  page?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'page must be a numeric string' })
  page_size?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;
}
