import { Body, Button, Container, Head, Heading, Html, Preview, Section, Tailwind, Text } from 'react-email';

interface ForgotPasswordEmailProps {
  appName: string;
  name: string;
  url: string;
}

export function ForgotPasswordEmail({ appName, name, url }: ForgotPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Reset your {appName} password</Preview>
      <Tailwind>
        <Body className="m-0 bg-[#121212] font-sans text-[#121212]">
          <Container className="mx-auto my-10 max-w-150 overflow-hidden rounded-lg bg-white">
            <Section className="bg-[#121212] px-8 py-6">
              <Text className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">{appName}</Text>
            </Section>
            <Section className="px-8 py-10">
              <Heading className="m-0 text-2xl font-bold tracking-tight text-[#121212]">Reset your password</Heading>
              <Text className="mt-6 text-base leading-7 text-[#555555]">Hello {name},</Text>
              <Text className="text-base leading-7 text-[#555555]">
                We received a request to reset the password for your {appName} account.
              </Text>
              <Text className="text-base leading-7 text-[#555555]">Click the button below to choose a new password.</Text>
              <Section className="mt-8">
                <Button href={url} className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white">
                  Reset Password
                </Button>
              </Section>
              <Section className="mt-8 rounded-md bg-[#f7f7f7] px-5 py-4">
                <Text className="m-0 text-sm leading-6 text-[#666666]">
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </Text>
              </Section>
              <Text className="mt-8 text-sm leading-6 text-[#888888]">
                If the button above doesn't work, copy and paste the following link into your browser:
              </Text>
              <Text className="break-all text-sm leading-6 text-emerald-700">{url}</Text>
            </Section>
            <Section className="border-t border-[#eeeeee] bg-[#fafafa] px-8 py-6">
              <Text className="m-0 text-xs leading-5 text-[#888888]">
                You're receiving this email because a password reset was requested for your {appName} account.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}


/**
 * Preview props for React Email dev server
 * Run `pnpm email:dev` to preview this template
 */
ForgotPasswordEmail.PreviewProps = {
  appName: 'NextHunt',
  name: 'John Doe',
  url: 'https://example.com/dashboard'
} satisfies ForgotPasswordEmailProps;

export default ForgotPasswordEmail;