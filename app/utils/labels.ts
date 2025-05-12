const authors = {
  benjamin: 'Benjamin Boileux',
  aude: 'Aude Cadiot',
  corentin: 'Corentin Guérin',
  ethel: 'Ethel Gosset',
};

const tags = {
  organisation: 'Organisation',
  strategy: 'Stratégie',
  team: 'L’équipe',
  process: 'Process & outils',
  ops: 'L’Ops',
  compensation: 'Compensation',
  deployment: 'Déploiement',
  revenue: 'Revenue Operations',
  performance: 'Performance',
  'revenue-echoes': 'Revenue Echoes',
  podcast: 'Podcast',
};

const getAuthor = (slug: string) => {
  return authors[slug as keyof typeof authors] ?? slug;
};

const getTag = (slug: string) => {
  return tags[slug as keyof typeof tags] ?? slug;
};

export { getAuthor, getTag };
