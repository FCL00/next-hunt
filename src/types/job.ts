export interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  job_publisher: string;
  job_employment_type: string;

  job_employment_types: EmploymentType[];

  job_apply_link: string;
  job_apply_is_direct: boolean;

  apply_options: ApplyOption[];

  job_description: string;
  job_is_remote: boolean;
  job_posted_at: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;

  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;

  job_latitude: number;
  job_longitude: number;

  job_benefits: string | null;
  job_benefits_strings: string[] | null;

  job_google_link: string;

  job_salary: string | null;
  job_salary_string: string | null;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_period: string | null;

  job_highlights: JobHighlights;

  job_uid: string;
}

export interface ApplyOption {
  apply_link: string;
  is_direct: boolean;
  publisher: string;
}

export interface JobHighlights {
  job_onet_soc: string | null;
  job_onet_job_zone: string | null;
  employer_reviews: unknown | null;
}

export interface JobSearchResponse {
  status: string;
  request_id: string;
  parameters: JobSearchParams;
  data: {
    jobs: Job[];
    cursor: string | null;
  };
}

export type JobDatePosted = 'all' | 'today' | '3days' | 'week' | 'month';
export type EmploymentType = 'FULLTIME' | 'CONTRACTOR' | 'PARTTIME' | 'INTERN';
export type JobRequirement = 'under_3_years_experience' | 'more_than_3_years_experience' | 'no_experience' | 'no_degree';


export type JobSearchParams = {
  query: string;
  cursor?: string;
  num_pages?: number;
  country?: string;
  language?: string;
  location?: string;
  date_posted?: JobDatePosted;
  work_from_home?: boolean;
  employment_types?: EmploymentType[];
  job_requirements?: JobRequirement[];
  radius?: number;
  exclude_job_publishers?: string[];
  fields?: string[];
};
