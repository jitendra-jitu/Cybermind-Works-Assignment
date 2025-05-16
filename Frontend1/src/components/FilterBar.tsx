
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { JobFilters } from "@/types/job";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface FilterBarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Apply debouncing to all filter changes
  const applyDebounce = (newFilters: JobFilters) => {
    // Clear any existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    setDebouncedFilters(newFilters);
    
    // Set a new timeout
    const timeout = setTimeout(() => {
      onFilterChange(newFilters);
    }, 500); // 500ms debounce time
    
    setDebounceTimeout(timeout);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...debouncedFilters, [name]: value };
    applyDebounce(newFilters);
  };

  const handleJobTypeChange = (value: string) => {
    const newFilters = { ...debouncedFilters, type: value };
    applyDebounce(newFilters);
  };

  const handleSalaryChange = (values: number[]) => {
    const salaryLabels = [`₹${values[0]}k`, `₹${values[1]}k`];
    const newFilters = {
      ...debouncedFilters,
      minSalary: salaryLabels[0],
      maxSalary: salaryLabels[1],
    };
    applyDebounce(newFilters);
  };

  // Initialize filters
  useEffect(() => {
    setDebouncedFilters(filters);
  }, [filters]);

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // Parse the current salary values for the slider
  const minSalary = parseInt(debouncedFilters.minSalary.replace(/[^\d]/g, ''));
  const maxSalary = parseInt(debouncedFilters.maxSalary.replace(/[^\d]/g, ''));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-9"
          placeholder="Search By Job Title, Role"
          name="title"
          value={debouncedFilters.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="relative">
        <Input
          placeholder="Preferred Location"
          name="location"
          value={debouncedFilters.location}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Select value={debouncedFilters.type} onValueChange={handleJobTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 lg:col-span-1">
        <div className="mb-2 flex justify-between">
          <Label>Salary Per Month</Label>
          <div className="text-sm text-gray-500">
            {debouncedFilters.minSalary} - {debouncedFilters.maxSalary}
          </div>
        </div>
        <Slider
          value={[minSalary || 30, maxSalary || 100]}
          min={30}
          max={100}
          step={5}
          onValueChange={handleSalaryChange}
          className="my-4"
        />
      </div>
    </div>
  );
};

export default FilterBar;
