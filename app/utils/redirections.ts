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

export async function redirectBlogPosts(slug: string) {
  const blogRedirections: Record<string, string | undefined> = {
    '1': 'business-ops-revenue-ops-definition',
    '2': 'controle-depenses-logiciels-saas',
    '3': 'role-business-ops-manager',
    '4': 'principes-plan-compensation-reussi',
    '5': 'etapes-choisir-nouvel-outil',
    '6': 'role-business-operations-engineer',
    '7': 'conception-plan-compensation-contours',
    '8': 'conception-plan-compensation-contenu',
    '10': 'agence-conseil-revenue-operations-business-partner',
    '11': 'plans-compensation-ne-fonctionnent-pas',
  };

  if (Object.keys(blogRedirections).includes(slug)) {
    const newSlug = blogRedirections[slug];
    if (newSlug) {
      throw redirect(`/blog/${newSlug}`, 301);
    }
  }
}
