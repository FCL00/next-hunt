import type { AppLocale } from './config';

import commonEn from '@/locales/messages/common/en.json';
import commonEs from '@/locales/messages/common/es.json';
import commonTl from '@/locales/messages/common/tl.json';

import authEn from '@/locales/messages/auth/en.json';
import authEs from '@/locales/messages/auth/es.json';
import authTl from '@/locales/messages/auth/tl.json';

const messages = {
  en: {
    common: commonEn,
    auth: authEn,
  },

  es: {
    common: commonEs,
    auth: authEs,
  },

  tl: {
    common: commonTl,
    auth: authTl,
  },
};

export function getMessages(locale: AppLocale) {
  return messages[locale];
}