'use client';
import { paths } from '@/config/paths';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms';
import { type SignUpInput, signUpInputSchema } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    const { confirmPassword, ...credentials } = data;
    await signUp.email(credentials, {
      onSuccess: () => {
        toast.success('Successfully created an account!');
        router.push(paths.auth.signIn.getHref());
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="sm:w-full md:max-w-md lg:max-w-lg">
      <h1 className="max-w-sm">Get Started!</h1>
      <p className="mb-8 text-[14px] text-ink-100">
        Already have an Account?{' '}
        <Link className="text-ink-50 border-b border-b-ink-50" href={paths.auth.signIn.getHref()}>
          Login in here
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          label="Name"
          registration={register('name')}
          error={errors.name}
          placeholder="Enter your display name"
        />
        <FormInput type="email" label="Email" registration={register('email')} error={errors.email} placeholder="you@example.com" />
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
        <Button type="submit" className="w-full text-[14.5px] p-[13px_16px]">
          Create Account
        </Button>
        <div className="mt-7 text-[12px] text-ink-200 leading-[1.6] text-center">
          By continuing you agree to Meridian's{' '}
          <Link href={'/terms'}>
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy">
            Privacy Policy
          </Link>
          .
        </div>
      </form>
    </div>
  );
}
