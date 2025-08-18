import { LoaderFunctionArgs, redirect } from 'react-router';

import { Loader } from '~/components/ui/Loader';
import { redirectBlogPosts } from '~/utils/redirections';

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw redirect(`/blog`, 301);
  }

  await redirectBlogPosts(slug);

  return new Response('Not Found', { status: 404 });
}

export default function Index() {
  return <Loader />;
}
