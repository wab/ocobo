import { LoaderFunctionArgs, redirect } from '@remix-run/node';

import { Loader } from '~/components/ui/Loader';

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  throw redirect(`/clients/${slug}`, 301);
}

export default function Index() {
  return <Loader />;
}
