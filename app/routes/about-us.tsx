import { redirect } from '@remix-run/node';

import { Loader } from '~/components/ui/Loader';
import { url } from '~/utils/url';

export async function loader() {
  throw redirect(url.about, 301);
}

export default function Index() {
  return <Loader />;
}
