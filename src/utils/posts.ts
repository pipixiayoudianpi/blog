import type { PostMeta, PostSummary } from "@/types/post";

// 构建时，Vite 会把 src/posts 下所有 .md 文件都导入进来
const modules = import.meta.glob<PostMeta>("/src/posts/*.md", { eager: true });

export const posts: PostSummary[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.replace(/^.*\/(.+)\.md$/, "$1"),
    title: mod.title,
    date: mod.date,
    description: mod.description ?? "",
    tags: mod.tags ?? [],
  }))
  .filter((post) => {
    if (!post.title || !post.date) {
      console.warn(`[posts] ${post.slug}.md 缺少 title 或 date，已跳过`);
      return false;
    }
    return true;
  })
  .sort((a, b) => b.date.localeCompare(a.date));
