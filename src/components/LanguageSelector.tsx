'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';

import { type AppLocale, isValidLocale } from '@/locales/config';

type LanguageSelectorProps = {
  changeLocale: (locale: AppLocale) => Promise<void>;
};

export function LanguageSelector({ changeLocale }: LanguageSelectorProps) {
  const locale = useLocale();

  function handleLocaleChange(value: string) {
    if (!isValidLocale(value)) {
      return;
    }
    changeLocale(value);
  }

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger>
        <div className="flex items-center gap-2 text-ink px-0 lg:px-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="English" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="tl">Tagalog</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
