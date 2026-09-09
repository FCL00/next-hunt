'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { resetPassword } from '@/lib/auth-client';
import { paths } from '@/config/paths';
import { type ResetPasswordInput, resetPasswordInputSchema } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FormInput } from '@/components/ui/forms';
import { useTranslations } from 'next-intl';

export default function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const t = useTranslations('auth');
  const schema = resetPasswordInputSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (credentials: ResetPasswordInput) => {
    if (!token) {
      toast.error(t('notification-reset-failed'));
      router.replace(paths.auth.forgotPassword.getHref());
      return;
    }
    await resetPassword({
      newPassword: credentials.password,
      token: token,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success(t('notification-reset-successful'));
          router.replace(paths.auth.signIn.getHref());
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl">{t('reset-password-heading')}</CardTitle>
        <CardDescription>{t('reset-password-subheading')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button className="w-full" type="submit">
            {t('reset-password-label')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
