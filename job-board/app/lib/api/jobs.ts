// app/lib/api/jobs.ts
import { Job, ApiResponse } from '../types';

export const fetchJobs = async (page: number = 1): Promise<ApiResponse<Job[]>> => {
  try {
    const res = await fetch(`https://mockapi.io/api/jobs?page=${page}&limit=10`);
    const data = await res.json();
    return { data };
  } catch (error) {
    return { data: [], error: 'Failed to fetch jobs' };
  }
};