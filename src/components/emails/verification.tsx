import { Body, Button, Container, Head, Heading, Html, Preview, Section, Tailwind, Text } from 'react-email';

interface VerificationEmailProps {
  appName: string;
  name: string;
  url: string;
}

export function VerificationEmail({ appName, name, url }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Verify your {appName} email address</Preview>
      <Tailwind>
        <Body className="m-0 bg-[#121212] font-sans text-[#121212]">
          <Container className="mx-auto my-10 max-w-150 overflow-hidden rounded-lg bg-white">
            <Section className="bg-[#121212] px-8 py-6">
              <Text className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">{appName}</Text>
            </Section>
            <Section className="px-8 py-10">
              <Heading className="m-0 text-2xl font-bold tracking-tight text-[#121212]">Verify your email</Heading>
              <Text className="mt-6 text-base leading-7 text-[#555555]">Hello {name},</Text>
              <Text className="text-base leading-7 text-[#555555]">
                Thanks for creating an account with {appName}. Please verify your email address to finish setting up your account.
              </Text>
              <Section className="mt-8">
                <Button href={url} className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white">
                  Verify Email Address
                </Button>
              </Section>
              <Text className="mt-8 text-sm leading-6 text-[#888888]">
                If the button above doesn't work, copy and paste the following link into your browser:
              </Text>
              <Text className="break-all text-sm leading-6 text-emerald-700">{url}</Text>
              <Section className="mt-8 rounded-md bg-[#f7f7f7] px-5 py-4">
                <Text className="m-0 text-sm leading-6 text-[#666666]">
                  If you didn't create an account with {appName}, you can safely ignore this email.
                </Text>
              </Section>
            </Section>
            <Section className="border-t border-[#eeeeee] bg-[#fafafa] px-8 py-6">
              <Text className="m-0 text-xs leading-5 text-[#888888]">
                You're receiving this email because an account was created using this email address.
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
VerificationEmail.PreviewProps = {
  appName: 'NextHunt',
  name: 'John Doe',
  url: 'https://example.com/dashboard'
} satisfies VerificationEmailProps;

export default VerificationEmail;