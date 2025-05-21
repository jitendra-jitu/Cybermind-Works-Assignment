import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import FilterBar from '../components/JobFilters';
import JobCard from '../components/JobCard';
import { Job, JobFilters } from '../types/job';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<JobFilters>({
    title: '',
    location: 'all',
    type: 'all',
    minSalary: '10000',
    maxSalary: '1200000',
  });

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data: Job[] = await response.json();
      setJobs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchJobs();
    // Re-fetch when window regains focus
    window.addEventListener('focus', fetchJobs);
    return () => window.removeEventListener('focus', fetchJobs);
  }, []);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const keywords = filters.title.toLowerCase().split(' ').filter(Boolean);

    const searchableContent = `
      ${job.title}
      ${job.description ?? ''}
      ${job.requirements ?? ''}
      ${job.location}
      ${job.type}
    `.toLowerCase();

    const matchCount = keywords.reduce((count, keyword) => {
      return searchableContent.includes(keyword) ? count + 1 : count;
    }, 0);

    const relevance = keywords.length > 0 ? matchCount / keywords.length : 1;
    const matchesTitle = relevance >= 0.5;

    const matchesLocation =
      filters.location === 'all' ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      filters.type === 'all' ||
      job.type.toLowerCase() === filters.type.toLowerCase();

    const salaryParts = job.salaryRange?.split('-').map(s => parseInt(s.trim())) || [];
    const min = salaryParts[0] ?? 0;
    const max = salaryParts[1] ?? salaryParts[0] ?? 0;

    const minSalary = parseInt(filters.minSalary);
    const maxSalary = parseInt(filters.maxSalary);
    const matchesSalary = max >= minSalary && min <= maxSalary;

    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  return (
    <Layout>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {loading && <div className="p-4 text-center">Loading jobs...</div>}
      {error && <div className="p-4 text-center text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="col-span-full text-center text-gray-500 mt-10">
            No jobs found matching filters.
          </div>
        )}

        {!loading &&
          !error &&
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </Layout>
  );
}


