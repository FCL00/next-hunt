'use client';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type ForgotInput, forgotPasswordInputSchema } from '@/validators/auth';
import { Card, CardContent } from '@/components/ui/card';
import { requestPasswordReset } from '@/lib/auth-client';
import { paths } from '@/config/paths';
import { toast } from 'sonner';

export default function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotPasswordInputSchema),
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
          toast.success('Password reset email sent. Please check your inbox.');
        },
      },
    });
  };

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <Card>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-frances">Forgot Password?</h3>
            <p>Enter your email to recieve a password reset link</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type="email"
              label="Email"
              registration={register('email')}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Button className="w-full" type="submit">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
