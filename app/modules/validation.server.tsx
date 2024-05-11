export type StoryFrontmatter = {
  name: string;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  speaker: string;
  role: string;
  duration: string;
  scopes: string[];
  tags: string[];
  tools: string[];
  quotes: string[];
  deliverables: string[];
};

export function validateFrontMatter(
  attributes: unknown,
): attributes is StoryFrontmatter {
  return (
    !!attributes && typeof attributes !== 'function'
    // typeof attributes === 'object' &&
    // typeof (attributes as any)['title'] === 'string' &&
    // typeof (attributes as any)['description'] === 'string' &&
    // Array.isArray((attributes as any)['categories']) &&
    // typeof (attributes as any)['date'] === 'object'
  );
}
