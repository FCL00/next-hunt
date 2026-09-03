import axios from 'axios';
import type { JobSearchParams, JobSearchResponse } from '@/types';

export async function searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
  const response = await axios.get('/api/job-search', { params });
  return response.data;
}
