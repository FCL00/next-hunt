import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from 'react-email';

interface WelcomeEmailProps {
  appName: string;
  name: string;
  url: string;
}

export function WelcomeEmail({ url, name, appName }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Welcome to {appName}, {name}!
      </Preview>
      <Tailwind>
        <Body className="m-0 bg-[#121212] font-sans text-[#121212]">
          <Container className="mx-auto my-10 max-w-150 overflow-hidden rounded-lg bg-white">
            <Section className="bg-[#121212] px-8 py-6">
              <Text className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">{appName}</Text>
            </Section>
            <Section className="px-8 py-10">
              <Heading className="m-0 text-2xl font-bold tracking-tight text-[#121212]">Hello {name},</Heading>
              <Text className="mt-6 text-base leading-7 text-[#555555]">
                Thanks for creating an account. We're excited to have you here.
              </Text>
              <Text className="text-base leading-7 text-[#555555]">
                You can now explore the platform and start using all available features.
              </Text>
              <Section className="mt-8">
                <Button href={url} className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white">
                  Get Started
                </Button>
              </Section>
            </Section>
            <Section className="border-t border-[#eeeeee] bg-[#fafafa] px-8 py-6">
              <Text className="m-0 text-xs text-[#888888]">
                You're receiving this email because you created an account with {appName}.
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
WelcomeEmail.PreviewProps = {
  appName: 'NextHunt',
  name: 'John Doe',
  url: 'https://example.com/dashboard'
} satisfies WelcomeEmailProps;

export default WelcomeEmail;