import { ContentLayout as Layout } from '../layout/content-layout';
import { Button } from '../ui/button';

export function MainErrorFallback() {
  return (
    <Layout>
      <h1>
        Something went wrong...<span>Ooooops</span>
      </h1>
      <Button>Go Back</Button>
    </Layout>
  );
}
