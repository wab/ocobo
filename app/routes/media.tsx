import { redirect } from 'react-router';

import { Loader } from '~/components/ui/Loader';

export async function loader() {
  throw redirect(`/blog`, 301);
}

export default function Index() {
  return <Loader />;
}
