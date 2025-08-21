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

// Re-export Zod-inferred types for consistency
export type {
  StoryFrontmatter,
  BlogpostFrontmatter,
  PageFrontmatter,
} from './modules/schemas';

export type TvalidateFrontMatter<T> = (
  attributes: unknown,
) => attributes is T & Record<string, unknown>;
