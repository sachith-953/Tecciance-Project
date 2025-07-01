'use client';

import { useState, useEffect } from 'react';
import { fetchJobs } from '../lib/api/jobs';
import JobCard from '../components/dashboard/JobCard';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      const response = await fetchJobs(page);
      if (response.error) setError(response.error);
      else setJobs(response.data);
    };
    loadJobs();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Next Page
      </button>
    </div>
  );
}