import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY enviroment variable.' + 
    'Get your API key from https://resend.com/api-keys');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

