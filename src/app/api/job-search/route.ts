import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { env } from '@/lib/env/server';

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());

  try {
    const response = await axios.get(env.JOB_SEARCH_API_URL, {
      params,
      headers: {
        'x-rapidapi-key': env.JOB_SEARCH_API_KEY,
        'x-rapidapi-host': env.JOB_SEARCH_API_HOST,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
  }
}
