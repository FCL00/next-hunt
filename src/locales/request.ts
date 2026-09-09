import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, isValidLocale } from './config';
import { getMessages } from './message';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale = cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: getMessages(locale),
  };
});
