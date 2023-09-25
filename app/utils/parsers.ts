type PostCard = {
  title: string;
  description: string;
  author: string;
  read: string;
  coverImage: string;
  tags: string[];
  date: string;
};

type Post = {
  slug: string;
  card: PostCard;
};

type Meta = {
  name: string;
  content: string;
};

function postFromModule(mod: any): Post {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    card: {
      title: mod.attributes.meta.find((m: { title: string }) => m.title).title,
      description: mod.attributes.meta.find((m: Meta) => m.name === 'description').content,
      author: mod.attributes.meta.find((m: Meta) => m.name === 'author').content,
      read: mod.attributes.read,
      coverImage: mod.attributes.coverImage,
      date: mod.attributes.date,
      tags: mod.attributes.tags,
    },
  };
}

type Testimonial = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  duration: string;
  guest: string;
  position: string;
  scope: string[];
  tools: string[];
  tags: string[];
  quotes: string[];
};

function testimonialFromModule(mod: any): Testimonial {
  return {
    title: mod.attributes.meta.find((m: { title: string }) => m.title).title,
    description: mod.attributes.meta.find((m: Meta) => m.name === 'description').content,
    coverImage: mod.attributes.coverImage,
    logo: mod.attributes.logo,
    slug: mod.attributes.slug,
    duration: mod.attributes.duration,
    guest: mod.attributes.guest,
    position: mod.attributes.position,
    scope: mod.attributes.scope,
    tools: mod.attributes.tools,
    tags: mod.attributes.tags,
    quotes: mod.attributes.quotes,
  };
}

export { postFromModule, testimonialFromModule };
export type { Post, PostCard, Testimonial };
