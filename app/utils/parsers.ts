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

function postFromModule(mod: any): Post {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    card: {
      title: mod.attributes.meta.title,
      description: mod.attributes.meta.description,
      author: mod.attributes.meta.author,
      read: mod.attributes.read,
      coverImage: mod.attributes.meta.coverImage,
      date: mod.attributes.meta.date,
      tags: mod.attributes.tags.split(', '),
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
};

function testimonialFromModule(mod: any): Testimonial {
  return {
    title: mod.attributes.meta.title,
    description: mod.attributes.meta.description,
    coverImage: mod.attributes.coverImage,
    logo: mod.attributes.logo,
    slug: mod.filename.replace(/\.mdx?$/, ''),
    duration: mod.attributes.duration,
    guest: mod.attributes.guest,
    position: mod.attributes.position,
    scope: mod.attributes.scope.split(', '),
    tools: mod.attributes.tools.split(', '),
    tags: mod.attributes.tags.split(', '),
  };
}

export { postFromModule, testimonialFromModule };
export type { Post, PostCard, Testimonial };
