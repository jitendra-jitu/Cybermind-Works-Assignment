import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('type') type?: string,
    @Query('salaryRange') salaryRange?: string,
  ): Promise<Job[]> {
    return this.jobsService.findAll({
      title,
      location,
      type,
      salaryRange,
    });
  }
}