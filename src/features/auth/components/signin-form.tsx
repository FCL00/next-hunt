'use client';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms';
import { paths } from '@/config/paths';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SignInInput, signInInputSchema } from '@/validators/auth';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function signInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({ resolver: zodResolver(signInInputSchema) });

  const onSubmit = async (credentials: SignInInput) => {
    await signIn.email(credentials, {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success('Login successful!');
        router.replace(paths.dashboard.app.getHref());
      },
    });
  };

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <h1>Welcome to NextHunt!</h1>
      <p className="mb-8 text-[14px] text-ink-100">
        Don't have an account yet?{' '}
        <Link className="text-ink-50 border-b border-b-ink-50" href={paths.auth.signUp.getHref()}>
          Create an Account
        </Link>
      </p>
      <Button variant="secondary" className="w-full">
        Continue with Github
      </Button>
      <div className="divider"> or </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" label="Email" registration={register('email')} error={errors.email} placeholder="you@example.com" />
        <Input
          type="password"
          label="Password"
          registration={register('password')}
          error={errors.password}
          placeholder="••••••••"
        />
        <Link className="mb-1 border-none" variant="ghost" href={paths.auth.forgotPassword.getHref()}>
          Forgot password?
        </Link>
        <Button className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  );
}
