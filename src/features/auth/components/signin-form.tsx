'use client';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms';
import { paths } from '@/config/paths';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SignInInput, signInInputSchema } from '@/types';
import { signIn, signInWithGithub } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import { env } from '@/lib/env/client';
import { useEffect } from 'react';

export default function signInForm() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('auth');
  const schema = signInInputSchema(t);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (credentials: SignInInput) => {
    await signIn.email(credentials, {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success(t('notification-login-successful'));
        router.replace(paths.dashboard.app.getHref());
      },
    });
  };

  useEffect(() => {
    clearErrors();
  }, [locale]);

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <h1>{t('login-heading', { name: env.NEXT_PUBLIC_APP_NAME })}</h1>
      <p className="mb-8 text-[14px] text-ink-100">
        {t('login-create-account-prompt')}{' '}
        <Link className="text-ink-50 border-b border-b-ink-50" href={paths.auth.signUp.getHref()}>
          {t('login-create-account')}
        </Link>
      </p>
      <Button onClick={() => signInWithGithub()} variant="secondary" className="w-full">
        {t('socials-github')}
      </Button>
      <div className="divider"> or </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Link className="mb-1 border-none" href={paths.auth.forgotPassword.getHref()}>
          {t('login-forgot-password')}
        </Link>
        <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          {t('login-label')}
        </Button>
        <div className="mt-7 text-[12px] text-ink-200 leading-[1.6] text-center">
          {t('misc-label')} <Link href={'/terms'}>{t('misc-terms-label')}</Link> and{' '}
          <Link href="/privacy">{t('misc-policy-label')}</Link>.
        </div>
      </form>
    </div>
  );
}
