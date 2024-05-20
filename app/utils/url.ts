export const url = {
  homepage: '/',
  strategy: '/strategies-revenue-operations',
  projects: '/projets-revops',
  stories: '/clients',
  about: '/about',
  careers: '/careers',
  news: '/news',
  webinars: '/webinars',
  blog: '/blog',
  tools: '/tools',
  contact: '/contact',
  privacy: '/privacy',
  notFound: '/404',
};

export const getImageOgFullPath = (name: string, url: string) => {
  const ogImageUrl = new URL(`/og/${name}.jpg`, url);
  return ogImageUrl.href;
};
