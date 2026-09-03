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

export default function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInputSchema),
  });

  const onSubmit = async (credentials: ResetPasswordInput) => {
    if (!token) {
      toast.error('Invalid or expired password reset link.');
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
          toast.success('Password reset successfully!');
          router.replace(paths.auth.signIn.getHref());
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader className='mb-4'>
        <CardTitle className='text-2xl'>Reset Password</CardTitle>
        <CardDescription>Enter a strong new password to secure your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="password"
            label="Password"
            registration={register('password')}
            error={errors.password}
            placeholder="••••••••"
          />
           <FormInput
            type="password"
            label="Confirm Password"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />
          <Button className='w-full' type="submit">Reset Your Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}
