# Localization

## Summary

This directory contains the application's internationalization (i18n) configuration and translation utilities using [`next-intl`](https://next-intl.dev/).

The application currently supports:

* English (`en`)
* Spanish (`es`)
* Tagalog (`tl`)

The application uses **cookie-based locale selection** instead of locale-based routing.

This means routes remain clean:

```text
/dashboard
/jobs
/applications
```

instead of:

```text
/en/dashboard
/es/dashboard
/tl/dashboard
```

The selected locale is stored in a `locale` cookie and is used by `next-intl` when rendering the application.

---

## Cookie-Based Locale

The user's selected language is stored in a cookie:

```text
locale=en
```

The flow looks like this:

```text
Language Selector -> changeLocale() -> locale cookie -> request.ts -> Validate locale -> getMessages(locale) -> next-intl -> Translated UI
```

When the language is changed, the application refreshes the current route so Server Components can render using the new locale.

If the cookie is missing or contains an unsupported locale, the application falls back to the default locale.

The current default locale is: ```en```

---

## Directory Structure

```text
locales/
├── README.md
├── config.ts
├── message.ts
├── request.ts
└── messages/
    ├── common/
    │   ├── en.json
    │   ├── es.json
    │   └── tl.json
    │
    ├── auth/
    │   ├── en.json
    │   ├── es.json
    │   └── tl.json
    │
    ├── dashboard/
    │   ├── en.json
    │   ├── es.json
    │   └── tl.json
    │
    ├── applications/
    │   ├── en.json
    │   ├── es.json
    │   └── tl.json
    │
    └── jobs/
        ├── en.json
        ├── es.json
        └── tl.json
```

The responsibilities are separated into four main areas:

| files         | description                       |
| ------------- | -----------------------------------|
| config.ts     | Defines supported locales          |
| message.ts    | Loads translation files            |
| request.ts    | Determines the current locale      |
| messages.ts   | Contains the actual translations   |

---

## `config.ts`

`config.ts` defines the locales supported by the application.

```ts
export const locales = ['en', 'tl', 'es'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'en';
```

Because `locales` uses `as const`, TypeScript automatically creates the following type:

```ts
type AppLocale = 'en' | 'tl' | 'es';
```

This gives the application type safety when working with locales.

### Locale Validation

`config.ts` also contains the locale validation helper:

```ts
export function isValidLocale(
  locale: string
): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}
```

This is important when reading locale values from sources that contain plain strings, such as cookies.

---

## `message.ts`

`message.ts` is responsible for loading all translation files.

Translation files are imported statically:

```ts
import commonEn from '@/locales/messages/common/en.json';
import commonEs from '@/locales/messages/common/es.json';
import commonTl from '@/locales/messages/common/tl.json';

import authEn from '@/locales/messages/auth/en.json';
import authEs from '@/locales/messages/auth/es.json';
import authTl from '@/locales/messages/auth/tl.json';
```

The messages are then grouped by locale:

```ts
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
```

`getMessages()` returns the messages for the requested locale:

```ts
export function getMessages(locale: AppLocale) {
  return messages[locale];
}
```

### Why Static Imports?

Do not use dynamic imports such as:

```ts
import(`./messages/auth/${locale}.json`);
```

The locale is dynamic, which can cause module resolution issues with Next.js/Turbopack.

Static imports make all translation modules known at build time.

---

## `request.ts`

`request.ts` connects the application's locale configuration with `next-intl`.

It reads the locale cookie and validates it before loading the appropriate messages.

The basic flow is:

```text
Request
   │
   ▼
Read locale cookie
   │
   ▼
Is locale valid?
   │
   ├── Yes ──► Use locale
   │
   └── No ───► Use default locale
   │
   ▼
getMessages(locale)
   │
   ▼
next-intl
```

This keeps locale detection in one place rather than having individual pages or components handle it.

---

# Adding a New Translation File / Message Namespace

Translations are organized by namespace or feature.

For example, if a new `settings` feature needs translations, create:

```text
messages/
└── settings/
    ├── en.json
    ├── es.json
    └── tl.json
```

Each language should contain the same translation keys.

Example:

```json
{
  "title": "Settings",
  "description": "Manage your account settings."
}
```

Then add the files to `message.ts`:

```ts
import settingsEn from '@/locales/messages/settings/en.json';
import settingsEs from '@/locales/messages/settings/es.json';
import settingsTl from '@/locales/messages/settings/tl.json';
```

Then add the namespace for each locale:

```ts
const messages = {
  en: {
    common: commonEn,
    auth: authEn,
    settings: settingsEn,
  },

  es: {
    common: commonEs,
    auth: authEs,
    settings: settingsEs,
  },

  tl: {
    common: commonTl,
    auth: authTl,
    settings: settingsTl,
  },
};
```

The folder name becomes the namespace:

```text
messages/settings/
```

becomes:

```ts
getTranslations('settings')
```

---

# Using Translations

## Server Components

For Server Components, use `getTranslations` from `next-intl/server`.

```tsx
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

If `dashboard/en.json` contains:

```json
{
  "title": "Dashboard",
  "description": "Manage your job applications."
}
```

you can access those values with:

```ts
t('title');
t('description');
```

---

## Client Components

For Client Components, use `useTranslations` from `next-intl`.

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function DashboardHeader() {
  const t = useTranslations('dashboard');

  return <h1>{t('title')}</h1>;
}
```

The component must include:

```tsx
'use client';
```

when using `useTranslations`.

---

# Adding a New Language

Suppose you want to add French (`fr`).

### 1. Add the locale to `config.ts`

```ts
export const locales = ['en', 'tl', 'es', 'fr'] as const;
```

`AppLocale` will automatically become:

```ts
'en' | 'tl' | 'es' | 'fr'
```

---

### 2. Add the translation files

Every namespace should have a French translation:

```text
messages/
├── common/
│   ├── en.json
│   ├── es.json
│   ├── tl.json
│   └── fr.json
│
├── auth/
│   ├── en.json
│   ├── es.json
│   ├── tl.json
│   └── fr.json
│
└── dashboard/
    ├── en.json
    ├── es.json
    ├── tl.json
    └── fr.json
```

---

### 3. Add the imports to `message.ts`

```ts
import commonFr from '@/locales/messages/common/fr.json';
import authFr from '@/locales/messages/auth/fr.json';
import dashboardFr from '@/locales/messages/dashboard/fr.json';
```

Then add the French messages:

```ts
fr: {
  common: commonFr,
  auth: authFr,
  dashboard: dashboardFr,
},
```

---

### 4. Add the language to the language selector

```tsx
<SelectItem value="fr">
  Français
</SelectItem>
```

If desired, a flag or other visual indicator can also be included.

---

# Important Rules

### Do

### Keep translations organized by namespace

```text
common/
auth/
dashboard/
applications/
jobs/
```

This keeps translation files small and makes it easier to find the text belonging to a specific feature.

### Keep keys consistent across languages

For example:

`en.json`:

```json
{
  "title": "Dashboard",
  "description": "Manage your applications."
}
```

`es.json`:

```json
{
  "title": "Panel",
  "description": "Gestiona tus solicitudes."
}
```

Both files should contain:

```text
title
description
```

Only the translated values should change.

### Use stable application values for logic

Use:

```ts
if (status === 'APPLIED') {
  // ...
}
```

instead of:

```ts
if (t('status') === 'Applied') {
  // ...
}
```

Translations should control **displayed text**, not application behavior.

---

## Don't

### Don't duplicate the namespace inside the JSON

For:

```text
messages/common/en.json
```

use:

```json
{
  "app": {
    "name": "Next Hunt"
  }
}
```

Do not use:

```json
{
  "common": {
    "app": {
      "name": "Next Hunt"
    }
  }
}
```

The folder already represents the namespace.

Therefore:

```ts
const t = await getTranslations('common');

t('app.name');
```

is correct.

---

### Don't use dynamic translation imports

Avoid:

```ts
import(`./messages/${namespace}/${locale}.json`);
```

Use static imports in `message.ts`.

---

### Don't put large amounts of HTML inside translations

Only use HTML in a translation when the text genuinely requires formatting.

---

# Formatting Translations Containing HTML

Some translations may intentionally contain HTML tags.

For example:

```json
{
  "heading": "Build your <strong>next career</strong> move."
}
```

Normal interpolation:

```tsx
<h1>{t('heading')}</h1>
```

will render the HTML tags as text.

For translations containing HTML, the project provides the `formatHTML()` utility:

```ts
import { formatHTML } from '@/lib/utils';
```

The utility sanitizes the HTML using `DOMPurify` before passing it to React:

```ts
import DOMPurify from 'isomorphic-dompurify';

export function formatHTML(rawText: string) {
  const cleanHTML = DOMPurify.sanitize(rawText);

  return {
    dangerouslySetInnerHTML: {
      __html: cleanHTML,
    },
  };
}
```

It can then be used like:

```tsx
<h1 {...formatHTML(t('heading'))} />
```

### Why sanitize the HTML?

React's `dangerouslySetInnerHTML` should not be used with unsanitized HTML.

`formatHTML()` sanitizes the translation before inserting it into the page.

### Use it only when necessary

For normal translations, prefer:

```tsx
<p>{t('description')}</p>
```

Only use:

```tsx
<p {...formatHTML(t('description'))} />
```

when the translation intentionally contains HTML.

---

# Current Available Languages

| Locale | Language | Status    |
| ------ | -------- | --------- |
| `en`   | English  | Available |
| `es`   | Español  | Available |
| `tl`   | Tagalog  | Available |

### Default Language

```text
English (en)
```

### Locale Codes

The locale codes used by the application are:

```text
en → English
es → Spanish
tl → Tagalog
```

When adding a new language, make sure the locale is added to `config.ts`, all required translation files are created, the messages are registered in `message.ts`, and the language is added to the language selector.


### Referrences

https://github.com/amannn/next-intl/discussions/437

https://stackoverflow.com/questions/77367244/a-solution-to-translating-zod-error-messages-using-next-intl