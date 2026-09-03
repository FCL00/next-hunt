import { HttpResponse, http } from 'msw';
import { jobSearchHandler } from './job-search';

export const handlers = [...jobSearchHandler];
