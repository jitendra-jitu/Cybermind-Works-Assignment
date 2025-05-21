export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salaryRange: string; // e.g., '600000-800000'
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: Date;
}

export interface JobFilters {
  title: string;
  location: string;
  type: string;
  minSalary: string;
  maxSalary: string;
}
