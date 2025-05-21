import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { JobFilters } from '@/types/job';

interface FilterBarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilters = (updated: Partial<JobFilters>) => {
    const newFilters = { ...localFilters, ...updated };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSalaryChange = (values: number[]) => {
    updateFilters({
      minSalary: `${values[0] * 10000}`,
      maxSalary: `${values[1] * 10000}`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4 mb-10">
      <div className="relative w-full md:w-1/4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-9"
          placeholder="Search by title, description, skills"
          value={localFilters.title}
          onChange={(e) => updateFilters({ title: e.target.value })}
        />
      </div>

      <div className="w-full md:w-1/5">
        <Select
          value={localFilters.location}
          onValueChange={(value: string) => updateFilters({ location: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {['all', 'Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Noida', 'Mumbai', 'Other'].map(
              (loc) => (
                <SelectItem key={loc} className="bg-sky-100" value={loc}>
                  {loc === 'all' ? 'All' : loc}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/5">
        <Select
          value={localFilters.type}
          onValueChange={(value: string) => updateFilters({ type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            {['all', 'Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
              <SelectItem key={type} className="bg-sky-100" value={type}>
                {type === 'all' ? 'All Types' : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/4">
        <Label className="text-sm text-gray-500 mb-1 block">
          Salary (₹{parseInt(filters.minSalary) / 1000}k – ₹{parseInt(filters.maxSalary) / 1000}k)
        </Label>
        <Slider 
          value={[
            parseInt(filters.minSalary) / 10000 || 1,
            parseInt(filters.maxSalary) / 10000 || 12,
          ]}
          min={1}
          max={120}
          step={1}
          onValueChange={handleSalaryChange}
          className="[&_[role=slider]]:bg-black [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 bg-sky-300"
        />
      </div>
    </div>
  );
};

export default FilterBar;