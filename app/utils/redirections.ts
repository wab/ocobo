import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

export async function redirectWithLocale({
  request,
  params,
}: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);

  if (!params.lang) {
    throw redirect(`/fr${pathname === '/' ? '' : pathname}`, 301);
  }
}
