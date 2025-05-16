import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobsList from "@/components/JobsList";
import { Card } from "@/components/ui/card";
import FilterBar from "@/components/FilterBar";
import { Job, JobFilters } from "@/types/job";
import JobBadge from "@/components/JobBadge";
import { toast } from "sonner";

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    title: "",
    location: "",
    type: "",
    minSalary: "₹50k",
    maxSalary: "₹80k",
  });

  const fetchJobs = async (queryParams: string = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/jobs${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched jobs:", data);
      
      // Transform the API response to match our Job interface
      const formattedJobs: Job[] = data.map((job: any) => {
        // Extract skills from requirements or create empty array
        const skills = job.skills || 
          job.requirements?.split(/[,.;]/).filter((s: string) => s.trim().length > 2).slice(0, 5).map((s: string) => s.trim()) || 
          [];
          
        return {
          id: job.id.toString(),
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salaryRange: job.salaryRange,
          description: job.description,
          requirements: job.requirements,
          responsibilities: job.responsibilities,
          applicationDeadline: job.applicationDeadline,
          logo: job.company.toLowerCase().includes('amazon') ? 'amazon' : 
                job.company.toLowerCase().includes('tesla') ? 'tesla' : 
                job.company.toLowerCase().includes('hub') ? 'hubspot' : 'default',
          postedAgo: job.createdAt ? formatPostedDate(job.createdAt) : '24h Ago',
          skills: skills
        };
      });
      
      setJobs(formattedJobs);
      setFilteredJobs(formattedJobs);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
      toast.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPostedDate = (dateString: string): string => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - postedDate.getTime();
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h Ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d Ago`;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);

    // Build query parameters for API request
    const params = new URLSearchParams();
    if (newFilters.title) params.append('title', newFilters.title);
    if (newFilters.location) params.append('location', newFilters.location);
    if (newFilters.type && newFilters.type !== 'all') params.append('type', newFilters.type);
    
    // Parse salary for API query - removing non-numeric characters and converting to actual values
    const minSalary = parseInt(newFilters.minSalary.replace(/[^\d]/g, '')) * 1000;
    const maxSalary = parseInt(newFilters.maxSalary.replace(/[^\d]/g, '')) * 1000;
    
    if (!isNaN(minSalary)) params.append('minSalary', minSalary.toString());
    if (!isNaN(maxSalary)) params.append('maxSalary', maxSalary.toString());
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    console.log(`Fetching jobs with query: ${queryString}`);
    
    // Fetch filtered jobs from API
    fetchJobs(queryString);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6 p-6 shadow-md">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Jobs</h2>
              <JobBadge count={filteredJobs.length} />
            </div>
          </div>

          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
              {error}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="col-span-full bg-gray-50 p-6 rounded-md border border-gray-200 text-center">
              <p className="text-gray-500 text-lg">No jobs found matching your filters.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleFilterChange({
                  title: "",
                  location: "",
                  type: "",
                  minSalary: "₹50k",
                  maxSalary: "₹80k",
                })}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <JobsList jobs={filteredJobs} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
