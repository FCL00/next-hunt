import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import jobData from '@/testing/__mocks__/data/job-search.json';

const PAGE_SIZE = 10;

export const jobSearchHandler = [
  http.get('/api/job-search', ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query') ?? '';
    const country = url.searchParams.get('country') ?? '';
    const language = url.searchParams.get('language') ?? '';
    const cursor = url.searchParams.get('cursor');

    const page = cursor ? Number(cursor) : 1;

    const filteredJobs = jobData.data.jobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.job_title.toLowerCase().includes(query.toLowerCase()) ||
        job.job_description.toLowerCase().includes(query.toLowerCase());

      return matchesQuery;
    });

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const jobs = filteredJobs.slice(start, end);
    const hasNextPage = end < filteredJobs.length;

    return HttpResponse.json({
      status: 'OK',
      request_id: uuidv4(),

      parameters: {
        query,
        num_pages: 1,
        country,
        language,
      },

      data: {
        jobs,
        cursor: hasNextPage ? String(page + 1) : null,
      },
    });
  }),
];