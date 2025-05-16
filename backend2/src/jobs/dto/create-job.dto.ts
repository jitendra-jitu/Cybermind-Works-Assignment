import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  salaryRange: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  responsibilities: string;

  @IsDateString()
  applicationDeadline: string; // Use string ISO format, will convert in entity
}
