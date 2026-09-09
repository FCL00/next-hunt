'use server';
import { cookies } from 'next/headers';
import { locales, AppLocale as Locale} from './config';

export async function changeLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    throw new Error('Invalid Locale');
  }

  const cookiesStore = await cookies();
  cookiesStore.set('locale', locale, { httpOnly: true, sameSite: 'lax', path: '/' });
}
