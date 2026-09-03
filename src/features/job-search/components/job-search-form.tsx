'use client';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

type JobSearchFormValues = {
  query: string;
  country: string;
  language?: string;
};

type JobSearchFormProps = {
  onSearch: (values: JobSearchFormValues) => void;
};

export function JobSearchForm({ onSearch }: JobSearchFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<JobSearchFormValues>({
    defaultValues: { query: '', country: 'us', language: 'en' },
  });

  const onSubmit = async (inputData: JobSearchFormValues) => {
    onSearch(inputData);
  };

  return (
    <form className="w-full grid grid-cols-3 lg:grid-cols-6 p-4 gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
      <Input className="col-span-1 lg:col-span-3" {...register('query')} placeholder="Job Title or keyword" />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="col-span-3 lg:col-span-1 h-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ph">Philippines</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button 
        className="col-span-1 lg:col-span-1" 
        size="lg" 
        type="submit" 
        disabled={isSubmitting} 
        isLoading={isSubmitting}>
        <div className="flex items-center gap-2">
          <Search />
          <span className="hidden md:block">Search</span>
        </div>
      </Button>
    </form>
  );
}
