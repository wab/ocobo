const authors = {
  benjamin: 'Benjamin Boileux',
  aude: 'Aude Cadiot',
  corentin: 'Corentin Guérin',
};

const tags = {
  organisation: 'Organisation',
  strategy: 'Stratégie',
  team: 'L’équipe',
  process: 'Process & outils',
  ops: 'L’Ops',
  compensation: 'Compensation',
  deployment: 'Déploiement',
};

const getAuthor = (slug: string) => {
  return authors[slug as keyof typeof authors] ?? slug;
};

const getTag = (slug: string) => {
  return tags[slug as keyof typeof tags] ?? slug;
};

export { getAuthor, getTag };
