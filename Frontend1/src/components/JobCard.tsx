
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import CompanyLogo from "./CompanyLogo";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Extract skills from requirements (if not explicitly provided)
  const extractedSkills = job.skills || 
    job.requirements?.split(/[,.;]/).filter(skill => 
      skill.trim().length > 2 && skill.trim().length < 30
    ).slice(0, 5).map(skill => skill.trim()) || [];

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <CompanyLogo company={job.logo} />
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {job.postedAgo}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="inline-block mr-1">1-3 yr Exp</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="inline-block mr-1">{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="inline-block mr-1">{job.salaryRange}</span>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {extractedSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>
        
        <Button className="w-full">Apply Now</Button>
      </div>
    </Card>
  );
};

export default JobCard;
