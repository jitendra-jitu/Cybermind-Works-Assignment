"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export enum JobType {
  FULL_TIME = "Full-time",
  PART_TIME = "Part-time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}

type JobFormValues = {
  title: string;
  company: string;
  location: string;
  type: JobType;
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
};

export default function CreateJobPage() {
  const { register, handleSubmit, reset } = useForm<JobFormValues>();
  const router = useRouter();

  const onSubmit = async (data: JobFormValues) => {
    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to post job");

      reset();
      router.push("/");
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create New Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="e.g. Frontend Developer"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
            <input
              {...register("company", { required: true })}
              placeholder="e.g. OpenAI"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <input
              {...register("location", { required: true })}
              placeholder="e.g. Remote or New York"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Salary Range</label>
            <input
              {...register("salaryRange")}
              placeholder="e.g. 600000-800000"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Job Type</label>
            <select
              {...register("type", { required: true })}
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select type</option>
              {Object.values(JobType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Application Deadline</label>
            <input
              type="date"
              {...register("applicationDeadline", { required: true })}
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Job Description</label>
            <input
              {...register("description", { required: true })}
              placeholder="Short description..."
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Requirements</label>
            <input
              {...register("requirements")}
              placeholder="e.g. React, TypeScript"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Responsibilities</label>
            <input
              {...register("responsibilities")}
              placeholder="e.g. Build UI components"
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Button spans both columns */}
          <div className="md:col-span-2">
            <div className="flex justify-center">
              <button
              type="submit"
              className="w-1/4 bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
              Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
