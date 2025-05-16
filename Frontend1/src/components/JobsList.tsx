
import React from "react";
import JobCard from "./JobCard";
import { Job } from "@/types/job";

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};

export default JobsList;
