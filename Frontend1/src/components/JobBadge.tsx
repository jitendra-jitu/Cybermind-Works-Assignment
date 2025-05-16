
import React from "react";

interface JobBadgeProps {
  count: number;
}

const JobBadge: React.FC<JobBadgeProps> = ({ count }) => {
  return (
    <div className="flex items-center">
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
        {count} {count === 1 ? "Job" : "Jobs"}
      </span>
    </div>
  );
};

export default JobBadge;
