'use client';
import { paths } from '@/config/paths';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms';
import { type SignUpInput, signUpInputSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function SignUpForm() {
  const router = useRouter();
  const t = useTranslations('auth');
  const schema = signUpInputSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpInput) => {
    const { confirmPassword, ...credentials } = data;
    await signUp.email(credentials, {
      onSuccess: () => {
        toast.success(t('notification-register-successful'));
        router.push(paths.auth.signIn.getHref());
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <h1 className="max-w-sm">{t('register-heading')}</h1>
      <p className="mb-8 text-[14px] text-ink-100">
        {t('register-existing-account')}{' '}
        <Link className="text-ink-50 border-b border-b-ink-50" href={paths.auth.signIn.getHref()}>
          {t('login-here')}
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          label={t('forms-username-label')}
          registration={register('name')}
          error={errors.name}
          placeholder={t('forms-username-placeholder')}
        />
        <FormInput
          type="email"
          label={t('forms-email-label')}
          registration={register('email')}
          error={errors.email}
          placeholder={t('forms-email-placeholder')}
        />
        <FormInput
          type="password"
          label={t('forms-password-label')}
          registration={register('password')}
          error={errors.password}
          placeholder={t('forms-password-placeholder')}
        />
        <FormInput
          type="password"
          label={t('forms-confirm-password')}
          registration={register('confirmPassword')}
          error={errors.confirmPassword}
          placeholder={t('forms-password-placeholder')}
        />
        <Button type="submit" className="w-full text-[14.5px] p-[13px_16px]">
          {t('register-create-account')}
        </Button>
        <div className="mt-7 text-[12px] text-ink-200 leading-[1.6] text-center">
          {t('misc-label')}
          <Link href={'/terms'}>{t('misc-terms-label')}</Link> and <Link href="/privacy">{t('misc-policy-label')}</Link>.
        </div>
      </form>
    </div>
  );
}
