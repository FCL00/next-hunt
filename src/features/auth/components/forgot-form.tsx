'use client';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type ForgotInput, forgotPasswordInputSchema } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { requestPasswordReset } from '@/lib/auth-client';
import { paths } from '@/config/paths';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function ForgotForm() {
  const t = useTranslations('auth');
  const schema = forgotPasswordInputSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (credentials: ForgotInput) => {
    await requestPasswordReset({
      email: credentials.email,
      redirectTo: paths.auth.resetPassword.getHref(),
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success(t('notification-forgot-successful'));
        },
      },
    });
  };

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <Card>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-frances">{t('login-forgot-password')}</h3>
            <p>{t('forms-reset-password-placeholder')}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type="email"
              label={t('forms-email-label')}
              registration={register('email')}
              error={errors.email}
              placeholder={t('forms-email-placeholder')}
            />
            <Button className="w-full" type="submit">
              {t('reset-password-label')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
