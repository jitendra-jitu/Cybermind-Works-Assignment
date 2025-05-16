
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
  logo: string;
  postedAgo: string;
  skills?: string[]; // Added skills field
}

export type JobFilters = {
  title: string;
  location: string;
  type: string;
  minSalary: string;
  maxSalary: string;
};
