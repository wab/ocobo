import type { RenderableTreeNode } from '@markdoc/markdoc';

export type ActionResult<State, ResponseBody> = [
  status: number,
  state: State,
  resData: ResponseBody | undefined,
];

export type MarkdocFile<FrontMatter> = {
  slug: string;
  content: RenderableTreeNode;
  markdown: string;
  frontmatter: FrontMatter;
};

export type StoryFrontmatter = {
  name: string;
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

export type PageFrontmatter = {
  title: string;
  description: string;
};

export type BlogpostFrontmatter = {
  title: string;
  description: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  read: string;
};

export type TvalidateFrontMatter<T> = (
  attributes: unknown,
) => attributes is T & Record<string, unknown>;
